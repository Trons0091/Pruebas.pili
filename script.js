import * as THREE from "https://unpkg.com/three@0.132.2/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.132.2/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

/* ---------- CAMARA ---------- */
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight,0.1,100);
camera.position.z = 5;
scene.add(camera);

/* ---------- RENDER ---------- */
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(innerWidth,innerHeight);

/* ---------- CONTROLES ---------- */
const controls = new OrbitControls(camera,canvas);
controls.enableDamping=true;

/* ---------- IMAGEN A PARTICULAS ---------- */
const img = new Image();
img.src = "https://i.imgur.com/6RMhx.gif"; // imagen de prueba

img.onload = ()=>{

    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");

    c.width = img.width;
    c.height = img.height;
    ctx.drawImage(img,0,0);

    const pixels = ctx.getImageData(0,0,c.width,c.height).data;

    const vertices = [];
    const colors = [];

    for(let y=0;y<c.height;y++){
        for(let x=0;x<c.width;x++){

            const i = (y*c.width+x)*4;
            const r = pixels[i];
            const g = pixels[i+1];
            const b = pixels[i+2];
            const a = pixels[i+3];

            if(a>150){
                vertices.push(
                    (x-c.width/2)*0.02,
                    -(y-c.height/2)*0.02,
                    (Math.random()-0.5)*0.5
                );

                colors.push(r/255,g/255,b/255);
            }
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices,3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors,3));

    const material = new THREE.PointsMaterial({
        size:0.03,
        vertexColors:true
    });

    const points = new THREE.Points(geometry,material);
    scene.add(points);
};

/* ---------- RESIZE ---------- */
addEventListener("resize",()=>{
    camera.aspect=innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
});

/* ---------- LOOP ---------- */
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}
animate();
