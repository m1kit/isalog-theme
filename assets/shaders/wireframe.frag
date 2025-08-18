uniform vec3 color;
uniform float opacity;
varying vec3 vPosition;

void main() {
    // Vary opacity based on wave height
    float heightFactor = (vPosition.y + 0.5) * 0.5 + 0.5;
    float finalOpacity = opacity * heightFactor;
    
    gl_FragColor = vec4(color, finalOpacity);
}