import * as BABYLON from 'babylonjs';
import { AmmoJSPlugin, MeshBuilder, PhysicsImpostor, Vector3 } from 'babylonjs';
// @ts-ignore
import * as Ammo from 'ammo.js';

let canvas = <HTMLCanvasElement>document.getElementById("renderCanvas")
let engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true
})

function createScene() {
    // 物理エンジンを有効にする
    let scene = new BABYLON.Scene(engine)

    let sphere = MeshBuilder.CreateSphere('sphere', {})
    sphere.position.y = 20

    let ground = MeshBuilder.CreateBox('box', {width: 3, height: 0.1, depth: 3})

    Ammo().then((Ammo: any) => {
        let gravity = new Vector3(0.0, -9.8, 0.0)
        let plugin = new AmmoJSPlugin(true, Ammo)
        scene.enablePhysics(gravity, plugin)

        sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, {
            mass: 1,
            restitution: 1
        })

        ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.PlaneImpostor, {
            mass:0
        })
    })

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 0.84, Math.PI/2.4,
     20, new BABYLON.Vector3(0,0,0), scene);
    camera.attachControl(canvas, true);

    let posL = new BABYLON.Vector3(0, 1, 0)
    new BABYLON.HemisphericLight('light', posL, scene)

    return scene
}

let scene = createScene()
engine.runRenderLoop( () => {
    scene.render()
})

window.addEventListener('resize', () => {
    engine.resize()
})