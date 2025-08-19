import * as THREE from 'three';
import vertexShader from '../shaders/wireframe.vert';
import fragmentShader from '../shaders/wireframe.frag';

interface MousePosition {
    x: number;
    y: number;
}

class WireframeAnimation {
    private scene: THREE.Scene | null = null;
    private camera: THREE.PerspectiveCamera | null = null;
    private renderer: THREE.WebGLRenderer | null = null;
    private mesh: THREE.Mesh | null = null;
    private mouse: MousePosition = { x: 0, y: 0 };
    private targetMouse: MousePosition = { x: 0, y: 0 };
    private startTime: number = Date.now();
    private isMouseActive: boolean = false;
    private mouseInfluence: number = 0;
    private transitionSpeed: number = 0.05;
    private isHomePage: boolean = false;
    private originalHeight: number = 0;
    private originalPadding: { top: number; bottom: number } = { top: 0, bottom: 0 };
    private readonly BASE_FONT_SIZE: number = 16; // From body font-size in SCSS

    constructor() {
        this.detectHomePage();
        this.storeOriginalDimensions();
        this.init();
        this.animate();
        this.setupEvents();
    }
    
    private init(): void {
        const header = document.querySelector('.page-header') as HTMLElement;
        if (!header) return;
        
        const rect = header.getBoundingClientRect();
        
        // Setup Three.js
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);
        this.camera.position.set(0, 3, 2); // Position above and slightly back to look down at ground
        this.camera.lookAt(0, 0, 0); // Look at the center of the ground plane
        
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(rect.width, rect.height);
        this.renderer.setClearColor(0x000000, 0);
        
        // Create triangular grid
        this.createGrid(rect.width / rect.height);
        
        // Add to header (static styles are handled by CSS)
        header.appendChild(this.renderer.domElement);
        
        // Set pointer-events via JS to avoid W3C CSS validation error
        this.renderer.domElement.style.pointerEvents = 'none';
    }
    
    private createGrid(aspectRatio: number): void {
        const segmentSize = 1; // Size of each square segment
        
        // Decide number of segments first - make it wider
        const widthSegments = Math.floor(12 * aspectRatio); // Increased from 8 to 12
        const heightSegments = 8; // Increased from 6 to 8
        
        // Calculate actual width and height to ensure square segments
        const width = widthSegments * segmentSize;
        const height = heightSegments * segmentSize;
        
        // Create plane geometry with perfect square segments
        const planeGeometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);

        const transformationMatrix = new THREE.Matrix4();
        transformationMatrix.set(
            1, -0.5,          0,  0,  // Shear X by 0.5 * Z
            0, 0,             0,  0,  // Not used
            0, Math.sqrt(3) / 2,  0,     0,  // Scale Z to make triangles equilateral
            0,                0,  0,     1
        );
        
        planeGeometry.applyMatrix4(transformationMatrix);
        
        // Use original geometry (not WireframeGeometry) for shader effects
        const geometry = planeGeometry;
        
        // Create custom shader material with wave effects
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                color: { value: new THREE.Color(0x64b5f6) }, // Brighter blue
                opacity: { value: 0.8 },
                mouseX: { value: 0.0 },
                mouseY: { value: 0.0 },
                mouseInfluence: { value: 0.0 }
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            wireframe: true
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene!.add(this.mesh);
    }
    
    private setupEvents(): void {
        const header = document.querySelector('.page-header') as HTMLElement;
        if (!header) return;
        
        header.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = header.getBoundingClientRect();
            this.targetMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.targetMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            this.isMouseActive = true;
        });
        
        header.addEventListener('mouseenter', () => {
            this.isMouseActive = true;
        });
        
        header.addEventListener('mouseleave', () => {
            this.isMouseActive = false;
        });
        
        window.addEventListener('resize', () => {
            const rect = header.getBoundingClientRect();
            this.camera!.aspect = rect.width / rect.height;
            this.camera!.updateProjectionMatrix();
            this.renderer!.setSize(rect.width, rect.height);
            
            // Recalculate original dimensions for responsive scroll animation
            this.storeOriginalDimensions();
        });

        // Add scroll listener for subtitle fade effect
        window.addEventListener('scroll', () => {
            this.handleScrollFade();
        });
    }
    
    private animate(): void {
        requestAnimationFrame(() => this.animate());
        
        if (!this.mesh) return;
        
        // Smooth transition between mouse and time-based animation
        this.updateTransition();
        
        // Update mouse uniforms for wave control
        const material = this.mesh.material as THREE.ShaderMaterial;
        material.uniforms.mouseX.value = this.mouse.x;
        material.uniforms.mouseY.value = this.mouse.y;
        material.uniforms.mouseInfluence.value = this.mouseInfluence;
        
        // Update shader time uniform for wave animation
        // On non-home pages, pass time=0 to disable automatic animations
        const elapsedTime = this.isHomePage ? (Date.now() - this.startTime) * 0.001 : 0;
        
        material.uniforms.time.value = elapsedTime;
        
        // Animate base opacity
        material.uniforms.opacity.value = 0.8 + Math.sin(Date.now() * 0.002) * 0.1;
        
        this.renderer!.render(this.scene!, this.camera!);
    }

    private updateTransition(): void {
        // Smooth interpolation for mouse position
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.1;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.1;

        // Smooth transition for mouse influence
        const targetInfluence = this.isMouseActive ? 1.0 : 0.0;
        this.mouseInfluence += (targetInfluence - this.mouseInfluence) * this.transitionSpeed;

        // Clamp to avoid floating point precision issues
        if (Math.abs(this.mouseInfluence - targetInfluence) < 0.001) {
            this.mouseInfluence = targetInfluence;
        }
    }

    private detectHomePage(): void {
        // Check if current page is home page using Jekyll's page class
        const header = document.querySelector('.page-header');
        this.isHomePage = header?.classList.contains('page-header-home') ?? false;
    }

    private storeOriginalDimensions(): void {
        const header = document.querySelector('.page-header') as HTMLElement;
        if (!header) return;
        
        // Temporarily reset scroll-applied styles to get true original dimensions
        const originalStyles = {
            height: header.style.height,
            paddingTop: header.style.paddingTop,
            paddingBottom: header.style.paddingBottom
        };
        
        // Clear scroll-applied styles
        header.style.height = '';
        header.style.paddingTop = '';
        header.style.paddingBottom = '';
        
        // Store the natural height of the header
        this.originalHeight = header.getBoundingClientRect().height;
        
        // Store original padding values
        const computedStyle = window.getComputedStyle(header);
        this.originalPadding.top = parseInt(computedStyle.paddingTop, 10) || 0;
        this.originalPadding.bottom = parseInt(computedStyle.paddingBottom, 10) || 0;
        
        // Restore the scroll-applied styles
        header.style.height = originalStyles.height;
        header.style.paddingTop = originalStyles.paddingTop;
        header.style.paddingBottom = originalStyles.paddingBottom;
    }

    private handleScrollFade(): void {
        const header = document.querySelector('.page-header') as HTMLElement;
        const subtitle = document.querySelector('.project-tagline') as HTMLElement;
        const scrollY = window.scrollY;
        const maxScroll = 300; // Distance over which animation completes
        
        // Calculate progress (0 to 1)
        const progress = Math.min(1, scrollY / maxScroll);
        const opacity = Math.max(0, 1 - 2 * progress);
        
        const title = header.querySelector('.project-name') as HTMLElement;
        
        // Calculate heights in em units using base font size from SCSS
        const originalHeightEm = this.originalHeight / this.BASE_FONT_SIZE;
        const minHeightEm = title ? (title.getBoundingClientRect().height / this.BASE_FONT_SIZE) + 2.5 : 6; // 3.5em spacing
        const targetHeightEm = originalHeightEm * (1 - progress) + minHeightEm * progress;

        // Fade subtitle and canvas
        if (subtitle) {
            subtitle.style.opacity = opacity.toString();
        }
        
        if (this.renderer && this.renderer.domElement) {
            this.renderer.domElement.style.opacity = opacity.toString();
        }
        
        // Calculate padding in em units using base font size from SCSS
        const originalPaddingEm = this.originalPadding.top / this.BASE_FONT_SIZE;
        const minPaddingEm = 1; // 1em minimum
        const targetPaddingEm = originalPaddingEm * (1 - progress) + minPaddingEm * progress;
        
        // Calculate background opacity (1.0 to 0.8)
        const originalOpacity = 1.0;
        const minOpacity = 0.85;
        const targetBgOpacity = originalOpacity * (1 - progress) + minOpacity * progress;

        // Shrink header height, padding, and background opacity
        if (header) {
            header.style.height = `${targetHeightEm}em`;
            header.style.paddingTop = `${targetPaddingEm}em`;
            header.style.paddingBottom = `${targetPaddingEm}em`;
            header.style.setProperty('--header-alpha', targetBgOpacity.toString());
        }
    }

}

// Initialize
document.addEventListener('DOMContentLoaded', () => new WireframeAnimation());