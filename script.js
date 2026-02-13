import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

/* CAMERA */
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight,0.1,100);
camera.position.z = 5;
scene.add(camera);

/* RENDER */
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(innerWidth,innerHeight);

/* CONTROLS */
const controls = new OrbitControls(camera,canvas);
controls.enableDamping=true;

/* PARTICULAS DE PRUEBA */
const geometry = new THREE.BufferGeometry();
const vertices = [];

for(let i=0;i<5000;i++){
    vertices.push(
        (Math.random()-0.5)*10,
        (Math.random()-0.5)*10,
        (Math.random()-0.5)*10
    );
}

geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices,3));

const material = new THREE.PointsMaterial({size:0.05,color:"white"});
const points = new THREE.Points(geometry,material);
scene.add(points);

/* RESIZE */
addEventListener("resize",()=>{
    camera.aspect=innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
});

/* LOOP */
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}
animate();
