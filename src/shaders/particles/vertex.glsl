uniform float uTime;
uniform float uParticlesSize;

void main() {
  vec3 pos = position;
  pos.xy += sin(uTime) * 0.1;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uParticlesSize;
}
