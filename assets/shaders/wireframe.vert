uniform float time;
uniform float mouseX;
uniform float mouseY;
uniform float mouseInfluence;
varying vec3 vPosition;

void main() {
    vec3 pos = position;
    
    // Mouse-controlled waves
    float mouseWaveIntensity = 0.5 + mouseY * 0.5;
    float mousePhaseShift = mouseX * 3.14159;
    
    float mouseWave1 = sin(pos.x * 0.3 + time + mousePhaseShift) * mouseWaveIntensity;
    float mouseWave2 = sin(pos.z * 0.4 + time * 1.2 + mousePhaseShift * 0.5) * mouseWaveIntensity * 0.7;
    
    // Create ripple effect from mouse position
    float mouseDistance = distance(vec2(pos.x, pos.z), vec2(mouseX * 5.0, mouseY * 3.0));
    float mouseRipple = sin(mouseDistance * 2.0 - time * 3.0) * 0.3 * (1.0 / (mouseDistance + 1.0));
    
    // Time-based automatic waves (when mouse is not active)
    float autoWave1 = sin(pos.x * 0.2 + time * 0.8) * 0.3;
    float autoWave2 = sin(pos.z * 0.25 + time * 0.6) * 0.25;
    float autoWave3 = sin((pos.x + pos.z) * 0.15 + time * 1.0) * 0.2;
    
    // Blend between mouse and automatic animations
    vec3 mouseWaves = vec3(0.0, mouseWave1 + mouseWave2 + mouseRipple, 0.0);
    vec3 autoWaves = vec3(0.0, autoWave1 + autoWave2 + autoWave3, 0.0);
    
    vec3 blendedWaves = mix(autoWaves, mouseWaves, mouseInfluence);
    pos += blendedWaves;
    
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}