import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as lil from 'lil-gui'

/* DEBUG TOOLS
lil-gui > https://lil-gui.georgealways.com/#Guide
control-panel
ControlKit
Guify
Oui
*/



/* Sizes */
const sizes = {
    width: window.innerWidth,
    height: window.innerWidth
}

window.addEventListener('resize', () => {
    //Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //re - render
    renderer.setSize(sizes.width, sizes.height)
})

/**Cursor */
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/** Objects */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
    color: 'gray',
    // wireframe: true
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


/*** Camera */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.lookAt(mesh.position)

scene.add(camera)

/*Controls OrbitControl*/
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/** Renderer */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Animations
const tick = () => {

    //update Controls
    controls.update()

    //Renders
    renderer.render(scene, camera)


    window.requestAnimationFrame(tick)
}


tick()

/**DEBUG */
const gui = new lil.GUI()

const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + 10})
    }
}

// gui.add(mesh.rotation, 'y', -3, 3, 0.01)
gui
    .add(mesh.rotation, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('rotation')

gui
    .add(mesh, 'visible')

gui 
    .add(material, 'wireframe')

gui 
    .addColor(parameters, 'color')
    .onChange(() => {
        material.color.set(parameters.color)
    })

gui
    .add(parameters, 'spin')
    .name('döndür')