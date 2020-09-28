import * as BABYLON from 'babylonjs';

let canvas = <HTMLCanvasElement>document.getElementById("renderCanvas")
let engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true
})

function createScene() {
    let scene = new BABYLON.Scene(engine)

    let posC = new BABYLON.Vector3(0, 5, -10)
    let camera = new BABYLON.FreeCamera("camera", posC, scene)
    let target = BABYLON.Vector3.Zero()
    camera.setTarget(target)
    camera.attachControl(canvas, false)

    let posL = new BABYLON.Vector3(0, 1, 0)
    new BABYLON.HemisphericLight('light', posL, scene)

    let sphere = BABYLON.Mesh.CreateSphere('sphere', 32, 2, scene, false,
        BABYLON.Mesh.FRONTSIDE)
    sphere.position.y = 1

    BABYLON.Mesh.CreateGround('ground', 6, 6, 2, scene, false)
    return scene
}

let scene = createScene()
engine.runRenderLoop( () => {
    scene.render()
})

window.addEventListener('resize', () => {
    engine.resize()
})