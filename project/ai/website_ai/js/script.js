import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/+esm";


/* =========================================================
   SCENE
========================================================= */

const canvas =
    document.getElementById("robotCanvas");

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0xdcefff);

scene.fog =
    new THREE.Fog(
        0xdcefff,
        18,
        40
    );


/* =========================================================
   CAMERA
========================================================= */

const camera =
    new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );

camera.position.set(
    6.7,
    4.4,
    10.4
);

camera.lookAt(
    2.25,
    3.0,
    0
);


/* =========================================================
   RENDERER
========================================================= */

const renderer =
    new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: "high-performance"
    });

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.shadowMap.enabled =
    true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
    1.08;


/* =========================================================
   LIGHTS
========================================================= */

const hemiLight =
    new THREE.HemisphereLight(
        0xffffff,
        0x9bb4c8,
        2.5
    );

scene.add(
    hemiLight
);


const keyLight =
    new THREE.DirectionalLight(
        0xffffff,
        4.4
    );

keyLight.position.set(
    8,
    12,
    8
);

keyLight.castShadow =
    true;

keyLight.shadow.mapSize.set(
    2048,
    2048
);

keyLight.shadow.camera.left =
    -12;

keyLight.shadow.camera.right =
    12;

keyLight.shadow.camera.top =
    12;

keyLight.shadow.camera.bottom =
    -12;

scene.add(
    keyLight
);


const fillLight =
    new THREE.DirectionalLight(
        0x9edcff,
        1.8
    );

fillLight.position.set(
    -7,
    6,
    4
);

scene.add(
    fillLight
);


const rimLight =
    new THREE.DirectionalLight(
        0xcdf4ff,
        2.0
    );

rimLight.position.set(
    4,
    8,
    -8
);

scene.add(
    rimLight
);


/* =========================================================
   FLOOR
========================================================= */

const ground =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            35,
            35
        ),
        new THREE.MeshStandardMaterial({
            color: 0xe8f5ff,
            roughness: .94
        })
    );

ground.rotation.x =
    -Math.PI / 2;

ground.position.y =
    -1.30;

ground.receiveShadow =
    true;

scene.add(
    ground
);


/* =========================================================
   MATERIALS
========================================================= */

const whiteShell =
    new THREE.MeshPhysicalMaterial({
        color: 0xf0f4fa,
        roughness: .22,
        metalness: .02,
        clearcoat: 1,
        clearcoatRoughness: .10
    });


const whiteShadow =
    new THREE.MeshPhysicalMaterial({
        color: 0xc9d1dd,
        roughness: .34,
        metalness: .02,
        clearcoat: .55,
        clearcoatRoughness: .18
    });


const visorMaterial =
    new THREE.MeshPhysicalMaterial({
        color: 0x071b28,
        roughness: .10,
        metalness: .18,
        clearcoat: 1,
        clearcoatRoughness: .05
    });


const cyanMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x73f6ff,
        emissive: 0x19d7e8,
        emissiveIntensity: 2.8,
        roughness: .2
    });


const jointMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xaeb7c4,
        roughness: .4,
        metalness: .14
    });


/* =========================================================
   ROBOT ROOT
========================================================= */

const robot =
    new THREE.Group();

robot.position.set(
    6.35,
    .10,
    -4.2
);

scene.add(
    robot
);


/* =========================================================
   BODY
========================================================= */

const body =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            1.42,
            64,
            48
        ),
        whiteShell
    );

body.scale.set(
    1,
    1.08,
    .82
);

body.position.y =
    1.53;

body.castShadow =
    true;

body.receiveShadow =
    true;

robot.add(
    body
);


/* Body highlight */

const bodyHighlight =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            .42,
            32,
            24
        ),
        new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: .42,
            roughness: .15
        })
    );

bodyHighlight.scale.set(
    .45,
    1.0,
    .18
);

bodyHighlight.position.set(
    -.58,
    2.02,
    .84
);

robot.add(
    bodyHighlight
);


/* Lower seam */

const seam =
    new THREE.Mesh(
        new THREE.TorusGeometry(
            .98,
            .028,
            12,
            64,
            Math.PI * 1.45
        ),
        whiteShadow
    );

seam.rotation.x =
    Math.PI / 2;

seam.rotation.z =
    Math.PI * .77;

seam.position.set(
    0,
    1.27,
    .89
);

robot.add(
    seam
);


/* =========================================================
   NECK
========================================================= */

const neck =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            .42,
            .48,
            .60,
            40
        ),
        jointMaterial
    );

neck.position.y =
    2.98;

neck.castShadow =
    true;

robot.add(
    neck
);


/* =========================================================
   HEAD PIVOT
========================================================= */

const headPivot =
    new THREE.Group();

headPivot.position.set(
    0,
    3.54,
    0
);

robot.add(
    headPivot
);


/* =========================================================
   HEAD SHELL
   Core Three.js only — no extra geometry module.
========================================================= */

const headShell =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            1.42,
            64,
            48
        ),
        whiteShell
    );

headShell.scale.set(
    1.22,
    .82,
    .72
);

headShell.castShadow =
    true;

headShell.receiveShadow =
    true;

headPivot.add(
    headShell
);


/* Top cap */

const topCap =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            .47,
            36,
            20
        ),
        whiteShadow
    );

topCap.scale.set(
    1.0,
    .34,
    .72
);

topCap.position.set(
    0,
    1.06,
    -.05
);

headPivot.add(
    topCap
);


/* =========================================================
   SIDE EARS
========================================================= */

function createEar(side) {

    const ear =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                .44,
                36,
                28
            ),
            whiteShadow
        );

    ear.scale.set(
        .55,
        1.0,
        .72
    );

    ear.position.set(
        side * 1.48,
        -.02,
        0
    );

    ear.castShadow =
        true;

    headPivot.add(
        ear
    );

}

createEar(-1);
createEar(1);


/* =========================================================
   VISOR
========================================================= */

const visor =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            1.16,
            64,
            48
        ),
        visorMaterial
    );

visor.scale.set(
    1.24,
    .72,
    .23
);

visor.position.set(
    0,
    -.07,
    .96
);

headPivot.add(
    visor
);


/* =========================================================
   EYES
========================================================= */

function createEye(x) {

    const eye =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                .19,
                36,
                28
            ),
            cyanMaterial
        );

    eye.scale.set(
        1.12,
        .68,
        .26
    );

    eye.position.set(
        x,
        .07,
        1.22
    );

    headPivot.add(
        eye
    );

    return eye;

}

const leftEye =
    createEye(-.57);

const rightEye =
    createEye(.57);


/* Eye glow light */

const eyeGlow =
    new THREE.PointLight(
        0x68efff,
        1.6,
        4
    );

eyeGlow.position.set(
    0,
    .04,
    1.45
);

headPivot.add(
    eyeGlow
);


/* =========================================================
   MOUTH
========================================================= */

const mouth =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            .15,
            32,
            24
        ),
        cyanMaterial
    );

mouth.scale.set(
    1.08,
    .55,
    .24
);

mouth.position.set(
    0,
    -.43,
    1.23
);

headPivot.add(
    mouth
);


/* =========================================================
   ARMS
========================================================= */

const arms = [];


function createArm(side) {

    const group =
        new THREE.Group();

    group.position.set(
        side * 1.56,
        1.85,
        .05
    );


    const upper =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                .48,
                40,
                32
            ),
            whiteShadow
        );

    upper.scale.set(
        .68,
        1.52,
        .67
    );

    upper.rotation.z =
        side * .17;

    upper.castShadow =
        true;

    group.add(
        upper
    );


    robot.add(
        group
    );

    arms.push(
        group
    );

}

createArm(-1);
createArm(1);


/* =========================================================
   FLOATING SHADOW
========================================================= */

const shadowCanvas =
    document.createElement("canvas");

shadowCanvas.width =
    256;

shadowCanvas.height =
    128;

const shadowCtx =
    shadowCanvas.getContext("2d");

const shadowGradient =
    shadowCtx.createRadialGradient(
        128,
        64,
        3,
        128,
        64,
        95
    );

shadowGradient.addColorStop(
    0,
    "rgba(45,80,105,.28)"
);

shadowGradient.addColorStop(
    1,
    "rgba(45,80,105,0)"
);

shadowCtx.fillStyle =
    shadowGradient;

shadowCtx.fillRect(
    0,
    0,
    256,
    128
);

const shadowTexture =
    new THREE.CanvasTexture(
        shadowCanvas
    );

const floatingShadow =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            3.0,
            1.15
        ),
        new THREE.MeshBasicMaterial({
            map: shadowTexture,
            transparent: true,
            depthWrite: false
        })
    );

floatingShadow.rotation.x =
    -Math.PI / 2;

floatingShadow.position.set(
    5.35,
    -1.27,
    .25
);

scene.add(
    floatingShadow
);


/* =========================================================
   MOUSE FOLLOW
========================================================= */

let targetMouseX =
    0;

let targetMouseY =
    0;

let smoothMouseX =
    0;

let smoothMouseY =
    0;


window.addEventListener(
    "mousemove",
    event => {

        targetMouseX =
            (
                event.clientX /
                window.innerWidth
            ) * 2 - 1;


        targetMouseY =
            (
                event.clientY /
                window.innerHeight
            ) * 2 - 1;

    }
);


document.documentElement.addEventListener(
    "mouseleave",
    () => {

        targetMouseX =
            0;

        targetMouseY =
            0;

    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

    }
);


/* =========================================================
   ANIMATION
========================================================= */

const clock =
    new THREE.Clock();


function animate() {

    const time =
        clock.getElapsedTime();


    /* Smooth mouse */

    smoothMouseX +=
        (
            targetMouseX -
            smoothMouseX
        ) * .075;


    smoothMouseY +=
        (
            targetMouseY -
            smoothMouseY
        ) * .075;


    /*
        Head follows mouse

        Left/right
    */

    headPivot.rotation.y =
        smoothMouseX * .52;


    /*
        Mouse UP = robot looks UP
        Mouse DOWN = robot looks DOWN
    */

    headPivot.rotation.x =
        smoothMouseY * .28;


    /*
        Tiny body response
    */

    body.rotation.y =
        smoothMouseX * .022;


    /*
        Floating
    */

    const floatY =
        Math.sin(
            time * 1.35
        ) * .075;


    robot.position.y =
        .10 +
        floatY;


    /*
        Arms gently float
    */

    arms[0].rotation.z =
        .025 +
        Math.sin(
            time * 1.1
        ) * .04;


    arms[1].rotation.z =
        -.025 -
        Math.sin(
            time * 1.1
        ) * .04;


    /*
        Tiny head idle tilt
    */

    headPivot.rotation.z =
        Math.sin(
            time * .75
        ) * .008;


    /*
        Eye glow
    */

    eyeGlow.intensity =
        1.4 +
        Math.sin(
            time * 2.4
        ) * .22;


    /*
        Shadow follows floating
    */

    floatingShadow.material.opacity =
        .82 -
        (
            floatY + .075
        ) * 1.7;


    floatingShadow.scale.setScalar(
        1 +
        (
            floatY + .075
        ) * .6
    );


    /*
        Camera subtle parallax
    */

    camera.position.x =
        6.7 +
        smoothMouseX * .11;


    camera.position.y =
        4.4 -
        smoothMouseY * .06;


    camera.lookAt(
        2.25,
        3.0,
        0
    );


    renderer.render(
        scene,
        camera
    );


    requestAnimationFrame(
        animate
    );

}


animate();
