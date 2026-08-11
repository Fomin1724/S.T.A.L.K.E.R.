/* =========================================================

   ☢ STALKER:

   3D WEB EDITION

   ЧАСТЬ 1 — ЗОНА + ЛАГЕРЬ + КОСТЁР

========================================================= */

/* =========================================================

   СЦЕНА

========================================================= */

const scene = new THREE.Scene();

scene.background =

    new THREE.Color(0x5c665f);

scene.fog =

    new THREE.Fog(

        0x5c665f,

        25,

        170

    );

/* =========================================================

   КАМЕРА

========================================================= */

const camera =

    new THREE.PerspectiveCamera(

        70,

        window.innerWidth /

        window.innerHeight,

        0.1,

        500

    );

camera.position.set(

    0,

    1.7,

    8

);

/* =========================================================

   РЕНДЕР

========================================================= */

const renderer =

    new THREE.WebGLRenderer({

        antialias: true,

        powerPreference:

            "high-performance"

    });

renderer.setSize(

    window.innerWidth,

    window.innerHeight

);

renderer.setPixelRatio(

    Math.min(

        window.devicePixelRatio,

        1.5

    )

);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =

    THREE.PCFSoftShadowMap;

document

    .getElementById("game")

    .appendChild(

        renderer.domElement

    );

/* =========================================================

   ОСВЕЩЕНИЕ ЗОНЫ

========================================================= */

const skyLight =

    new THREE.HemisphereLight(

        0x9da99b,

        0x20251f,

        1.15

    );

scene.add(

    skyLight

);

const moonLight =

    new THREE.DirectionalLight(

        0xaeb8a8,

        1

    );

moonLight.position.set(

    -50,

    70,

    20

);

moonLight.castShadow = true;

moonLight.shadow.mapSize.width =

    1024;

moonLight.shadow.mapSize.height =

    1024;

scene.add(

    moonLight

);

/* =========================================================

   ЗЕМЛЯ

========================================================= */

const ground =

    new THREE.Mesh(

        new THREE.PlaneGeometry(

            500,

            500

        ),

        new THREE.MeshStandardMaterial({

            color: 0x343a31,

            roughness: 1

        })

    );

ground.rotation.x =

    -Math.PI / 2;

ground.receiveShadow =

    true;

scene.add(

    ground

);

/* =========================================================

   ДОРОГА

========================================================= */

const road =

    new THREE.Mesh(

        new THREE.PlaneGeometry(

            14,

            250

        ),

        new THREE.MeshStandardMaterial({

            color: 0x292c28,

            roughness: 1

        })

    );

road.rotation.x =

    -Math.PI / 2;

road.position.set(

    0,

    0.015,

    -70

);

scene.add(

    road

);

/* =========================================================

   ДЕРЕВО

========================================================= */

function createTree(

    x,

    z,

    scale = 1

) {

    const tree =

        new THREE.Group();

    /* ствол */

    const trunk =

        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.28 * scale,

                0.4 * scale,

                4 * scale,

                7

            ),

            new THREE.MeshStandardMaterial({

                color: 0x3b3027,

                roughness: 1

            })

        );

    trunk.position.y =

        2 * scale;

    trunk.castShadow =

        true;

    tree.add(

        trunk

    );

    /* нижняя часть кроны */

    const crown1 =

        new THREE.Mesh(

            new THREE.ConeGeometry(

                2.2 * scale,

                4.5 * scale,

                8

            ),

            new THREE.MeshStandardMaterial({

                color: 0x263326,

                roughness: 1

            })

        );

    crown1.position.y =

        5 * scale;

    crown1.castShadow =

        true;

    tree.add(

        crown1

    );

    /* верхушка */

    const crown2 =

        new THREE.Mesh(

            new THREE.ConeGeometry(

                1.5 * scale,

                3.5 * scale,

                8

            ),

            new THREE.MeshStandardMaterial({

                color: 0x202d22,

                roughness: 1

            })

        );

    crown2.position.y =

        7.5 * scale;

    crown2.castShadow =

        true;

    tree.add(

        crown2

    );

    tree.position.set(

        x,

        0,

        z

    );

    scene.add(

        tree

    );

}

/* =========================================================

   ЛЕС

========================================================= */

for (

    let i = 0;

    i < 100;

    i++

) {

    const x =

        (Math.random() - 0.5)

        * 190;

    const z =

        -Math.random()

        * 190;

    /* оставляем дорогу */

    if (

        Math.abs(x) < 12

    )

        continue;

    createTree(

        x,

        z,

        0.65 +

        Math.random() * 0.8

    );

}

/* =========================================================

   ТРАВА

========================================================= */

function createGrass(

    x,

    z

) {

    const grass =

        new THREE.Mesh(

            new THREE.ConeGeometry(

                0.07,

                0.55,

                4

            ),

            new THREE.MeshStandardMaterial({

                color: 0x4b553e

            })

        );

    grass.position.set(

        x,

        0.27,

        z

    );

    scene.add(

        grass

    );

}

for (

    let i = 0;

    i < 400;

    i++

) {

    const x =

        (Math.random() - 0.5)

        * 180;

    const z =

        -Math.random()

        * 180;

    if (

        Math.abs(x) < 11

    )

        continue;

    createGrass(

        x,

        z

    );

}

/* =========================================================

   ЛАГЕРЬ

========================================================= */

const camp =

    new THREE.Group();

camp.position.set(

    0,

    0,

    -45

);

scene.add(

    camp

);

/* =========================================================

   КРУГ ЛАГЕРЯ

========================================================= */

const campGround =

    new THREE.Mesh(

        new THREE.CircleGeometry(

            11,

            32

        ),

        new THREE.MeshStandardMaterial({

            color: 0x454238,

            roughness: 1

        })

    );

campGround.rotation.x =

    -Math.PI / 2;

campGround.position.y =

    0.025;

camp.add(

    campGround

);

/* =========================================================

   КОСТЁР

========================================================= */

const fire =

    new THREE.Group();

fire.position.set(

    0,

    0,

    -45

);

scene.add(

    fire

);

/* =========================================================

   БРЁВНА

========================================================= */

for (

    let i = 0;

    i < 5;

    i++

) {

    const log =

        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.16,

                0.19,

                2,

                8

            ),

            new THREE.MeshStandardMaterial({

                color: 0x3b2920,

                roughness: 1

            })

        );

    log.rotation.z =

        Math.PI / 2;

    log.rotation.y =

        i * Math.PI / 5;

    log.position.y =

        0.16;

    log.castShadow =

        true;

    fire.add(

        log

    );

}

/* =========================================================

   УГЛИ

========================================================= */

const coals =

    new THREE.Mesh(

        new THREE.SphereGeometry(

            0.7,

            10,

            8

        ),

        new THREE.MeshBasicMaterial({

            color: 0x8b351d

        })

    );

coals.scale.y =

    0.25;

coals.position.y =

    0.25;

fire.add(

    coals

);

/* =========================================================

   ПЛАМЯ

========================================================= */

const flame =

    new THREE.Mesh(

        new THREE.ConeGeometry(

            0.65,

            1.8,

            10

        ),

        new THREE.MeshBasicMaterial({

            color: 0xff6b25,

            transparent: true,

            opacity: 0.9

        })

    );

flame.position.y =

    1.1;

fire.add(

    flame

);

/* =========================================================

   ВНУТРЕННЕЕ ПЛАМЯ

========================================================= */

const flameCore =

    new THREE.Mesh(

        new THREE.ConeGeometry(

            0.35,

            1.15,

            8

        ),

        new THREE.MeshBasicMaterial({

            color: 0xffc34a,

            transparent: true,

            opacity: 0.95

        })

    );

flameCore.position.y =

    0.95;

fire.add(

    flameCore

);

/* =========================================================

   СВЕТ КОСТРА

========================================================= */

const fireLight =

    new THREE.PointLight(

        0xff7b32,

        3.5,

        18

    );

fireLight.position.y =

    2;

fireLight.castShadow =

    true;

fire.add(

    fireLight

);

/* =========================================================

   ДЫМ

========================================================= */

const smoke =

    new THREE.Group();

fire.add(

    smoke

);

for (

    let i = 0;

    i < 12;

    i++

) {

    const particle =

        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.12 +

                Math.random() * 0.12,

                7,

                7

            ),

            new THREE.MeshBasicMaterial({

                color: 0x777871,

                transparent: true,

                opacity: 0.16

            })

        );

    particle.position.set(

        (Math.random() - 0.5)

        * 0.7,

        1.5 +

        Math.random() * 3,

        (Math.random() - 0.5)

        * 0.7

    );

    particle.userData.speed =

        0.2 +

        Math.random() * 0.3;

    particle.userData.phase =

        Math.random() *

        Math.PI * 2;

    smoke.add(

        particle

    );

}

/* =========================================================

   БОЧКИ

========================================================= */

function createBarrel(

    x,

    z

) {

    const barrel =

        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.55,

                0.55,

                1.1,

                12

            ),

            new THREE.MeshStandardMaterial({

                color: 0x4c5146,

                roughness: 0.9

            })

        );

    barrel.position.set(

        x,

        0.55,

        z

    );

    barrel.castShadow =

        true;

    scene.add(

        barrel

    );

    /* кольца */

    for (

        let i = 0;

        i < 2;

        i++

    ) {

        const ring =

            new THREE.Mesh(

                new THREE.TorusGeometry(

                    0.55,

                    0.035,

                    6,

                    16

                ),

                new THREE.MeshStandardMaterial({

                    color: 0x20231f

                })

            );

        ring.rotation.x =

            Math.PI / 2;

        ring.position.set(

            x,

            0.35 +

            i * 0.4,

            z

        );

        scene.add(

            ring

        );

    }

}

createBarrel(

    -7,

    -43

);

createBarrel(

    7,

    -48

);

createBarrel(

    -6,

    -52

);

/* =========================================================

   ЯЩИК

========================================================= */

function createCrate(

    x,

    z,

    rotation = 0

) {

    const crate =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                1.5,

                1.2,

                1.5

            ),

            new THREE.MeshStandardMaterial({

                color: 0x554838,

                roughness: 1

            })

        );

    crate.position.set(

        x,

        0.6,

        z

    );

    crate.rotation.y =

        rotation;

    crate.castShadow =

        true;

    scene.add(

        crate

    );

}

createCrate(

    -8,

    -48,

    0.2

);

createCrate(

    -6.8,

    -49.1,

    -0.1

);

createCrate(

    8,

    -43,

    0.4

);

/* =========================================================

   ЛАВОЧКИ

========================================================= */

function createBench(

    x,

    z,

    rotation = 0

) {

    const bench =

        new THREE.Group();

    const seat =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                3,

                0.25,

                0.55

            ),

            new THREE.MeshStandardMaterial({

                color: 0x4b392c

            })

        );

    seat.position.y =

        0.9;

    bench.add(

        seat

    );

    for (

        let i = -1;

        i <= 1;

        i += 2

    ) {

        const leg =

            new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.18,

                    0.9,

                    0.18

                ),

                new THREE.MeshStandardMaterial({

                    color: 0x30291f

                })

            );

        leg.position.set(

            i * 1.1,

            0.45,

            0

        );

        bench.add(

            leg

        );

    }

    bench.position.set(

        x,

        0,

        z

    );

    bench.rotation.y =

        rotation;

    scene.add(

        bench

    );

}

createBench(

    -4,

    -45,

    0.4

);

createBench(

    4,

    -45,

    -0.4

);

/* =========================================================

   АНИМАЦИЯ КОСТРА

========================================================= */

function updateFire(

    time

) {

    const wave1 =

        Math.sin(

            time * 9

        );

    const wave2 =

        Math.sin(

            time * 13

        );

    flame.scale.x =

        0.9 +

        wave1 * 0.12;

    flame.scale.z =

        0.9 +

        wave2 * 0.12;

    flame.scale.y =

        0.95 +

        wave2 * 0.15;

    flameCore.scale.x =

        0.9 +

        wave2 * 0.1;

    flameCore.scale.z =

        0.9 +

        wave1 * 0.1;

    fireLight.intensity =

        3.2 +

        Math.sin(

            time * 15

        ) * 0.6;

    /* дым */

    smoke.children.forEach(

        particle => {

            particle.position.y +=

                particle.userData.speed

                * 0.01;

            particle.position.x +=

                Math.sin(

                    time +

                    particle.userData.phase

                ) * 0.002;

            particle.scale.multiplyScalar(

                1.001

            );

            if (

                particle.position.y >

                5

            ) {

                particle.position.y =

                    1.4;

                particle.scale.set(

                    1,

                    1,

                    1

                );

            }

        }

    );

}

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

    }

);

/* =========================================================

   ВРЕМЯ

========================================================= */

const clock =

    new THREE.Clock();

/* =========================================================

   ЦИКЛ

========================================================= */

function animate() {

    requestAnimationFrame(

        animate

    );

    const delta =

        Math.min(

            clock.getDelta(),

            0.05

        );

    const time =

        performance.now() /

        1000;

    updateFire(

        time

    );

    renderer.render(

        scene,

        camera

    );

}

animate();

console.log(

    "☢ ЛАГЕРЬ ЗАГРУЖЕН"

);
/* =========================================================

   ЧАСТЬ 2 — СТАЛКЕРЫ, ГИТАРИСТ И СОБАКА

========================================================= */

/* =========================================================

   NPC

========================================================= */

const npcs = [];

/* =========================================================

   СОЗДАНИЕ СТАЛКЕРА

========================================================= */

function createStalker(

    x,

    z,

    type = "stalker"

) {

    const stalker =

        new THREE.Group();

    /* тело */

    const body =

        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.34,

                0.43,

                1.35,

                8

            ),

            new THREE.MeshStandardMaterial({

                color:

                    type === "guitarist"

                    ? 0x3e4438

                    : 0x353b34,

                roughness: 1

            })

        );

    body.position.y =

        1.15;

    body.castShadow =

        true;

    stalker.add(

        body

    );

    /* голова */

    const head =

        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.31,

                10,

                8

            ),

            new THREE.MeshStandardMaterial({

                color: 0x92775d,

                roughness: 1

            })

        );

    head.position.y =

        2.03;

    head.castShadow =

        true;

    stalker.add(

        head

    );

    /* рюкзак */

    const backpack =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.55,

                0.7,

                0.25

            ),

            new THREE.MeshStandardMaterial({

                color: 0x252d27

            })

        );

    backpack.position.set(

        0,

        1.25,

        -0.4

    );

    stalker.add(

        backpack

    );

    /* капюшон */

    const hood =

        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.37,

                10,

                8

            ),

            new THREE.MeshStandardMaterial({

                color: 0x202620

            })

        );

    hood.scale.y =

        0.75;

    hood.position.y =

        2.12;

    stalker.add(

        hood

    );

    /* руки */

    const armGeometry =

        new THREE.CylinderGeometry(

            0.11,

            0.13,

            1.05,

            7

        );

    const armMaterial =

        new THREE.MeshStandardMaterial({

            color: 0x30372f

        });

    const leftArm =

        new THREE.Mesh(

            armGeometry,

            armMaterial

        );

    leftArm.position.set(

        -0.45,

        1.25,

        0

    );

    leftArm.rotation.z =

        -0.18;

    stalker.add(

        leftArm

    );

    const rightArm =

        leftArm.clone();

    rightArm.position.x =

        0.45;

    rightArm.rotation.z =

        0.18;

    stalker.add(

        rightArm

    );

    /* оружие */

    if (

        type !== "guitarist"

    ) {

        const weapon =

            new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.12,

                    0.12,

                    1.35

                ),

                new THREE.MeshStandardMaterial({

                    color: 0x181a18

                })

            );

        weapon.position.set(

            0.42,

            1.35,

            0.25

        );

        weapon.rotation.x =

            -0.35;

        weapon.rotation.z =

            -0.15;

        stalker.add(

            weapon

        );

    }

    /* =====================================================

       ГИТАРА

    ===================================================== */

    if (

        type === "guitarist"

    ) {

        const guitar =

            new THREE.Group();

        const body =

            new THREE.Mesh(

                new THREE.SphereGeometry(

                    0.42,

                    12,

                    8

                ),

                new THREE.MeshStandardMaterial({

                    color: 0x70452c,

                    roughness: 0.9

                })

            );

        body.scale.set(

            0.8,

            1,

            0.3

        );

        guitar.add(

            body

        );

        const neck =

            new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.12,

                    0.12,

                    1.3

                ),

                new THREE.MeshStandardMaterial({

                    color: 0x493123

                })

            );

        neck.position.z =

            -0.75;

        guitar.add(

            neck

        );

        /* струны */

        for (

            let i = 0;

            i < 4;

            i++

        ) {

            const string =

                new THREE.Mesh(

                    new THREE.CylinderGeometry(

                        0.008,

                        0.008,

                        1.6,

                        5

                    ),

                    new THREE.MeshBasicMaterial({

                        color: 0xb9b7a4

                    })

                );

            string.rotation.x =

                Math.PI / 2;

            string.position.z =

                -0.35;

            string.position.x =

                -0.04 +

                i * 0.025;

            guitar.add(

                string

            );

        }

        guitar.position.set(

            0,

            1.25,

            0.5

        );

        guitar.rotation.x =

            -0.2;

        stalker.add(

            guitar

        );

        stalker.userData.guitar =

            guitar;

    }

    stalker.position.set(

        x,

        0,

        z

    );

    stalker.userData.type =

        type;

    stalker.userData.name =

        type === "guitarist"

            ? "Скрипач"

            : "Сталкер";

    scene.add(

        stalker

    );

    npcs.push(

        stalker

    );

    return stalker;

}

/* =========================================================

   СТАЛКЕРЫ В ЛАГЕРЕ

========================================================= */

const stalker1 =

    createStalker(

        -3.4,

        -42.5

    );

stalker1.rotation.y =

    0.7;

const stalker2 =

    createStalker(

        4.2,

        -43.5

    );

stalker2.rotation.y =

    -0.7;

const stalker3 =

    createStalker(

        -4.5,

        -48

    );

stalker3.rotation.y =

    2.4;

/* =========================================================

   ГИТАРИСТ

========================================================= */

const guitarist =

    createStalker(

        3,

        -48,

        "guitarist"

    );

guitarist.rotation.y =

    -2.4;

/* =========================================================

   СИДЯЩИЙ СТАЛКЕР

========================================================= */

function makeSitting(

    npc

) {

    npc.scale.y =

        0.72;

    npc.position.y =

        0.05;

}

/* садим одного возле костра */

makeSitting(

    stalker3

);

/* =========================================================

   СОБАКА

========================================================= */

function createDog(

    x,

    z

) {

    const dog =

        new THREE.Group();

    /* тело */

    const body =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                1.2,

                0.55,

                0.45

            ),

            new THREE.MeshStandardMaterial({

                color: 0x40382e,

                roughness: 1

            })

        );

    body.position.y =

        0.65;

    body.castShadow =

        true;

    dog.add(

        body

    );

    /* голова */

    const head =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.45,

                0.45,

                0.45

            ),

            new THREE.MeshStandardMaterial({

                color: 0x463c30

            })

        );

    head.position.set(

        0.7,

        0.78,

        0

    );

    dog.add(

        head

    );

    /* морда */

    const muzzle =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.3,

                0.25,

                0.3

            ),

            new THREE.MeshStandardMaterial({

                color: 0x29251f

            })

        );

    muzzle.position.set(

        0.95,

        0.7,

        0

    );

    dog.add(

        muzzle

    );

    /* уши */

    for (

        let i = -1;

        i <= 1;

        i += 2

    ) {

        const ear =

            new THREE.Mesh(

                new THREE.ConeGeometry(

                    0.13,

                    0.4,

                    5

                ),

                new THREE.MeshStandardMaterial({

                    color: 0x30291f

                })

            );

        ear.position.set(

            0.65,

            1.08,

            i * 0.16

        );

        dog.add(

            ear

        );

    }

    /* ноги */

    for (

        let i = 0;

        i < 4;

        i++

    ) {

        const leg =

            new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.07,

                    0.09,

                    0.6,

                    6

                ),

                new THREE.MeshStandardMaterial({

                    color: 0x302a23

                })

            );

        leg.position.set(

            i < 2

                ? 0.38

                : -0.38,

            0.3,

            i % 2 === 0

                ? 0.15

                : -0.15

        );

        dog.add(

            leg

        );

    }

    /* хвост */

    const tail =

        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.06,

                0.1,

                0.65,

                6

            ),

            new THREE.MeshStandardMaterial({

                color: 0x332c24

            })

        );

    tail.position.set(

        -0.68,

        0.82,

        0

    );

    tail.rotation.z =

        -0.8;

    dog.add(

        tail

    );

    dog.position.set(

        x,

        0,

        z

    );

    dog.rotation.y =

        -0.2;

    dog.userData.type =

        "dog";

    dog.userData.baseY =

        0;

    scene.add(

        dog

    );

    return dog;

}

const campDog =

    createDog(

        -7,

        -46

    );

/* =========================================================

   ЛЁГКАЯ АНИМАЦИЯ NPC

========================================================= */

function updateNPCs(

    time

) {

    npcs.forEach(

        (npc, index) => {

            /*

             небольшое естественное

             покачивание

            */

            if (

                npc.userData.type ===

                "guitarist"

            ) {

                const guitar =

                    npc.userData.guitar;

                if (

                    guitar

                ) {

                    guitar.rotation.z =

                        Math.sin(

                            time * 2.5

                        ) * 0.035;

                }

            }

            /*

             голова слегка двигается

            */

            const head =

                npc.children[1];

            if (

                head

            ) {

                head.rotation.y =

                    Math.sin(

                        time * 0.5 +

                        index

                    ) * 0.08;

            }

        }

    );

    /*

       собака дышит

    */

    if (

        campDog

    ) {

        campDog.scale.y =

            1 +

            Math.sin(

                time * 2

            ) * 0.025;

    }

}

/* =========================================================

   ДИАЛОГОВАЯ СИСТЕМА

========================================================= */

let activeNPC =

    null;

/* создаём окно диалога */

const dialogue =

    document.createElement(

        "div"

    );

dialogue.style.position =

    "fixed";

dialogue.style.left =

    "50%";

dialogue.style.bottom =

    "125px";

dialogue.style.transform =

    "translateX(-50%)";

dialogue.style.zIndex =

    "50";

dialogue.style.maxWidth =

    "80%";

dialogue.style.padding =

    "12px 16px";

dialogue.style.background =

    "rgba(7, 10, 8, 0.88)";

dialogue.style.border =

    "1px solid rgba(180,190,165,0.25)";

dialogue.style.color =

    "#cdd3c4";

dialogue.style.fontFamily =

    "Arial, sans-serif";

dialogue.style.fontSize =

    "13px";

dialogue.style.lineHeight =

    "1.5";

dialogue.style.textAlign =

    "center";

dialogue.style.display =

    "none";

dialogue.style.pointerEvents =

    "none";

document.body.appendChild(

    dialogue

);

/* =========================================================

   ФРАЗЫ

========================================================= */

const phrases = [

    "Тихо сегодня... Даже слишком.",

    "Не уходи далеко от лагеря ночью.",

    "Говорят, на старой дороге опять появилась аномалия.",

    "Если найдёшь артефакт — не хватай руками.",

    "Зона любит тех, кто умеет ждать.",

    "Дождь скоро усилится. Лучше переждать здесь."

];

/* =========================================================

   ПРОВЕРКА NPC

========================================================= */

function checkNPCDialogue() {

    let closest =

        null;

    let closestDistance =

        4.5;

    npcs.forEach(

        npc => {

            const distance =

                camera.position.distanceTo(

                    npc.position

                );

            if (

                distance <

                closestDistance

            ) {

                closest =

                    npc;

                closestDistance =

                    distance;

            }

        }

    );

    if (

        closest

    ) {

        if (

            activeNPC !==

            closest

        ) {

            activeNPC =

                closest;

            const index =

                npcs.indexOf(

                    closest

                );

            dialogue.textContent =

                closest.userData.type ===

                "guitarist"

                    ? "🎸 Гитарист: «Садись к костру. В Зоне ночью лучше не ходить одному.»"

                    : "🧑 Сталкер: «Эй, брат. Не стой под дождём — простудишься.»";

            dialogue.style.display =

                "block";

        }

    }

    else {

        activeNPC =

            null;

        dialogue.style.display =

            "none";

    }

}

/* =========================================================

   СОБАКА ИЗРЕДКА ДВИГАЕТСЯ

========================================================= */

function updateDog(

    time

) {

    if (

        !campDog

    )

        return;

    const wave =

        Math.sin(

            time * 0.7

        );

    campDog.position.x =

        -7 +

        wave * 0.35;

    campDog.rotation.y =

        -0.2 +

        wave * 0.15;

}

/* =========================================================

   ДОПОЛНИТЕЛЬНАЯ АТМОСФЕРА

========================================================= */

const campGlow =

    new THREE.PointLight(

        0xff9b4b,

        1.2,

        12

    );

campGlow.position.set(

    0,

    2,

    -45

);

scene.add(

    campGlow

);

/* =========================================================

   ОБНОВЛЕНИЕ

========================================================= */

const oldAnimate =

    animate;

/*

   Перехватываем основной цикл,

   добавляя NPC и диалоги.

*/

function animate() {

    requestAnimationFrame(

        animate

    );

    const time =

        performance.now() /

        1000;

    updateFire(

        time

    );

    updateNPCs(

        time

    );

    updateDog(

        time

    );

    checkNPCDialogue();

    renderer.render(

        scene,

        camera

    );

}

animate();

console.log(

    "☢ NPC + ГИТАРИСТ + СОБАКА ЗАГРУЖЕНЫ"

);
/* =========================================================

   ЧАСТЬ 3 — ТЕХНИКА + МУСОР + АТМОСФЕРА

========================================================= */

/* =========================================================

   СТАРЫЙ УАЗ

========================================================= */

function createUAZ(

    x,

    z,

    rotation = 0

) {

    const car =

        new THREE.Group();

    /* кузов */

    const body =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                4.2,

                1.4,

                2.1

            ),

            new THREE.MeshStandardMaterial({

                color: 0x42473d,

                roughness: 0.95

            })

        );

    body.position.y =

        1.25;

    body.castShadow =

        true;

    car.add(

        body

    );

    /* капот */

    const hood =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                1.3,

                0.65,

                2

            ),

            new THREE.MeshStandardMaterial({

                color: 0x3a3e36

            })

        );

    hood.position.set(

        2.35,

        1.45,

        0

    );

    car.add(

        hood

    );

    /* кабина */

    const cabin =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                1.8,

                1.6,

                2

            ),

            new THREE.MeshStandardMaterial({

                color: 0x343a32

            })

        );

    cabin.position.set(

        0.6,

        2.05,

        0

    );

    cabin.castShadow =

        true;

    car.add(

        cabin

    );

    /* окна */

    const windowMaterial =

        new THREE.MeshStandardMaterial({

            color: 0x202a28,

            roughness: 0.5,

            metalness: 0.1

        });

    const frontWindow =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.7,

                0.7,

                2.02

            ),

            windowMaterial

        );

    frontWindow.position.set(

        1.55,

        2.25,

        0

    );

    car.add(

        frontWindow

    );

    /* колёса */

    const wheelGeometry =

        new THREE.CylinderGeometry(

            0.55,

            0.55,

            0.35,

            12

        );

    const wheelMaterial =

        new THREE.MeshStandardMaterial({

            color: 0x171916,

            roughness: 1

        });

    const wheelPositions = [

        [1.35, 0.55, 1.08],

        [1.35, 0.55, -1.08],

        [-1.45, 0.55, 1.08],

        [-1.45, 0.55, -1.08]

    ];

    wheelPositions.forEach(

        position => {

            const wheel =

                new THREE.Mesh(

                    wheelGeometry,

                    wheelMaterial

                );

            wheel.rotation.x =

                Math.PI / 2;

            wheel.position.set(

                ...position

            );

            wheel.castShadow =

                true;

            car.add(

                wheel

            );

        }

    );

    /* фары */

    const headlightMaterial =

        new THREE.MeshBasicMaterial({

            color: 0xb5ad79

        });

    for (

        let i = -1;

        i <= 1;

        i += 2

    ) {

        const light =

            new THREE.Mesh(

                new THREE.SphereGeometry(

                    0.16,

                    8,

                    8

                ),

                headlightMaterial

            );

        light.position.set(

            2.98,

            1.45,

            i * 0.68

        );

        car.add(

            light

        );

    }

    car.position.set(

        x,

        0,

        z

    );

    car.rotation.y =

        rotation;

    scene.add(

        car

    );

    return car;

}

/* =========================================================

   МАШИНА В ЛАГЕРЕ

========================================================= */

const uaz =

    createUAZ(

        12,

        -53,

        -0.25

    );

/* =========================================================

   СТАРЫЙ АВТОМОБИЛЬ НА ДОРОГЕ

========================================================= */

const abandonedCar =

    createUAZ(

        -18,

        -82,

        0.5

    );

abandonedCar.rotation.y =

    1.1;

/* =========================================================

   КУЧИ МУСОРА

========================================================= */

function createJunk(

    x,

    z

) {

    const junk =

        new THREE.Group();

    const colors = [

        0x393b35,

        0x49443b,

        0x292d29,

        0x51473a

    ];

    for (

        let i = 0;

        i < 7;

        i++

    ) {

        const object =

            new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.4 +

                    Math.random() * 0.7,

                    0.25 +

                    Math.random() * 0.5,

                    0.35 +

                    Math.random() * 0.6

                ),

                new THREE.MeshStandardMaterial({

                    color:

                        colors[

                            Math.floor(

                                Math.random() *

                                colors.length

                            )

                        ],

                    roughness: 1

                })

            );

        object.position.set(

            (Math.random() - 0.5)

            * 2.5,

            0.2 +

            Math.random() * 0.35,

            (Math.random() - 0.5)

            * 2.5

        );

        object.rotation.set(

            Math.random(),

            Math.random(),

            Math.random()

        );

        object.castShadow =

            true;

        junk.add(

            object

        );

    }

    junk.position.set(

        x,

        0,

        z

    );

    scene.add(

        junk

    );

}

createJunk(

    -11,

    -57

);

createJunk(

    11,

    -39

);

createJunk(

    18,

    -61

);

/* =========================================================

   СТАРЫЕ ПОКРЫШКИ

========================================================= */

function createTire(

    x,

    z,

    rotation = 0

) {

    const tire =

        new THREE.Mesh(

            new THREE.TorusGeometry(

                0.55,

                0.22,

                8,

                16

            ),

            new THREE.MeshStandardMaterial({

                color: 0x171916,

                roughness: 1

            })

        );

    tire.position.set(

        x,

        0.55,

        z

    );

    tire.rotation.x =

        Math.PI / 2;

    tire.rotation.z =

        rotation;

    scene.add(

        tire

    );

}

createTire(

    -9,

    -41,

    0.4

);

createTire(

    -8,

    -41.7,

    1

);

/* =========================================================

   МЕТАЛЛИЧЕСКАЯ БОЧКА С КРЫШКОЙ

========================================================= */

function createMetalDrum(

    x,

    z

) {

    const drum =

        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.65,

                0.65,

                1.3,

                16

            ),

            new THREE.MeshStandardMaterial({

                color: 0x55564c,

                metalness: 0.4,

                roughness: 0.65

            })

        );

    drum.position.set(

        x,

        0.65,

        z

    );

    drum.rotation.z =

        Math.random() * 0.1;

    scene.add(

        drum

    );

    const top =

        new THREE.Mesh(

            new THREE.CircleGeometry(

                0.62,

                16

            ),

            new THREE.MeshStandardMaterial({

                color: 0x393b34

            })

        );

    top.rotation.x =

        -Math.PI / 2;

    top.position.set(

        x,

        1.31,

        z

    );

    scene.add(

        top

    );

}

createMetalDrum(

    10,

    -45

);

/* =========================================================

   ПАЛАТКА

========================================================= */

function createTent(

    x,

    z,

    rotation = 0

) {

    const tent =

        new THREE.Group();

    const material =

        new THREE.MeshStandardMaterial({

            color: 0x343b31,

            roughness: 1

        });

    const left =

        new THREE.Mesh(

            new THREE.ConeGeometry(

                2.3,

                3.2,

                3

            ),

            material

        );

    left.rotation.z =

        Math.PI / 2;

    left.scale.z =

        0.9;

    left.position.set(

        0,

        1.6,

        0

    );

    tent.add(

        left

    );

    tent.position.set(

        x,

        0,

        z

    );

    tent.rotation.y =

        rotation;

    scene.add(

        tent

    );

}

createTent(

    -14,

    -49,

    0.4

);

/* =========================================================

   ФОНАРЬ

========================================================= */

function createLantern(

    x,

    z

) {

    const pole =

        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.06,

                0.08,

                2.4,

                7

            ),

            new THREE.MeshStandardMaterial({

                color: 0x282b27

            })

        );

    pole.position.set(

        x,

        1.2,

        z

    );

    scene.add(

        pole

    );

    const lamp =

        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.2,

                8,

                8

            ),

            new THREE.MeshBasicMaterial({

                color: 0xffb75c

            })

        );

    lamp.position.set(

        x,

        2.35,

        z

    );

    scene.add(

        lamp

    );

    const light =

        new THREE.PointLight(

            0xffa84d,

            0.9,

            8

        );

    light.position.set(

        x,

        2.35,

        z

    );

    scene.add(

        light

    );

}

createLantern(

    -10,

    -47

);

createLantern(

    10,

    -47

);

/* =========================================================

   СТАРЫЕ ЯЩИКИ С БАРАХЛОМ

========================================================= */

function createPile(

    x,

    z

) {

    for (

        let i = 0;

        i < 5;

        i++

    ) {

        const box =

            new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.8 +

                    Math.random() * 0.6,

                    0.5 +

                    Math.random() * 0.5,

                    0.7 +

                    Math.random() * 0.5

                ),

                new THREE.MeshStandardMaterial({

                    color: 0x463d32

                })

            );

        box.position.set(

            x +

            (Math.random() - 0.5) * 2,

            0.35 +

            i * 0.4,

            z +

            (Math.random() - 0.5) * 2

        );

        box.rotation.y =

            Math.random();

        box.castShadow =

            true;

        scene.add(

            box

        );

    }

}

createPile(

    14,

    -45

);

/* =========================================================

   АНИМАЦИЯ ФОНАРЕЙ

========================================================= */

const lanternLights =

    [];

/* =========================================================

   ТУМАННЫЕ ПЫЛИНКИ

========================================================= */

const dustCount =

    150;

const dustGeometry =

    new THREE.BufferGeometry();

const dustPositions =

    new Float32Array(

        dustCount * 3

    );

for (

    let i = 0;

    i < dustCount;

    i++

) {

    dustPositions[

        i * 3

    ] =

        (Math.random() - 0.5)

        * 120;

    dustPositions[

        i * 3 + 1

    ] =

        0.5 +

        Math.random() * 12;

    dustPositions[

        i * 3 + 2

    ] =

        -Math.random()

        * 150;

}

dustGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(

        dustPositions,

        3

    )

);

const dust =

    new THREE.Points(

        dustGeometry,

        new THREE.PointsMaterial({

            color: 0x899084,

            size: 0.04,

            transparent: true,

            opacity: 0.3

        })

    );

scene.add(

    dust

);

/* =========================================================

   ЛЁГКИЙ ДОЖДЬ

========================================================= */

const rainCount =

    700;

const rainGeometry =

    new THREE.BufferGeometry();

const rainPositions =

    new Float32Array(

        rainCount * 3

    );

for (

    let i = 0;

    i < rainCount;

    i++

) {

    rainPositions[

        i * 3

    ] =

        (Math.random() - 0.5)

        * 160;

    rainPositions[

        i * 3 + 1

    ] =

        Math.random() * 70;

    rainPositions[

        i * 3 + 2

    ] =

        (Math.random() - 0.5)

        * 160;

}

rainGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(

        rainPositions,

        3

    )

);

const rain =

    new THREE.Points(

        rainGeometry,

        new THREE.PointsMaterial({

            color: 0x9da8a2,

            size: 0.1,

            transparent: true,

            opacity: 0.45

        })

    );

scene.add(

    rain

);

/* =========================================================

   ДОЖДЬ — ОБНОВЛЕНИЕ

========================================================= */

function updateRain() {

    const positions =

        rainGeometry

            .attributes

            .position

            .array;

    for (

        let i = 0;

        i < rainCount;

        i++

    ) {

        positions[

            i * 3 + 1

        ] -= 0.75;

        positions[

            i * 3

        ] += 0.01;

        if (

            positions[

                i * 3 + 1

            ] < 0

        ) {

            positions[

                i * 3 + 1

            ] = 70;

        }

    }

    rainGeometry

        .attributes

        .position

        .needsUpdate =

        true;

    rain.position.x =

        camera.position.x;

    rain.position.z =

        camera.position.z;

}

/* =========================================================

   ПЫЛЬ

========================================================= */

function updateDust(

    time

) {

    dust.rotation.y =

        time * 0.01;

}

/* =========================================================

   ФОНАРИ И СВЕТ

========================================================= */

function updateLanterns(

    time

) {

    scene.traverse(

        object => {

            if (

                object.isPointLight &&

                object.color.r > 0.8 &&

                object.color.g > 0.4

            ) {

                object.intensity =

                    0.8 +

                    Math.sin(

                        time * 4 +

                        object.position.x

                    ) * 0.12;

            }

        }

    );

}

/* =========================================================

   ОБЩАЯ АТМОСФЕРА

========================================================= */

function updateAtmosphere(

    time

) {

    updateRain();

    updateDust(

        time

    );

    updateLanterns(

        time

    );

}

/* =========================================================

   ИНФОРМАЦИЯ

========================================================= */

console.log(

    "☢ ТЕХНИКА + МУСОР + АТМОСФЕРА ЗАГРУЖЕНЫ"

);
/* =========================================================

   ☢ ЧАСТЬ 4 — HUD + МИНИ-КАРТА + ВЗАИМОДЕЙСТВИЕ

========================================================= */

/* =========================================================

   HUD

========================================================= */

const hud =

    document.createElement("div");

hud.style.position = "fixed";

hud.style.inset = "0";

hud.style.pointerEvents = "none";

hud.style.zIndex = "20";

document.body.appendChild(hud);

/* =========================================================

   ВЕРХНИЙ ЛЕВЫЙ УГОЛ

========================================================= */

const locationText =

    document.createElement("div");

locationText.innerHTML =

    "☢ ЗОНА<br>" +

    "<span>ЛАГЕРЬ</span>";

locationText.style.position =

    "absolute";

locationText.style.top =

    "20px";

locationText.style.left =

    "20px";

locationText.style.color =

    "#d0d4c7";

locationText.style.fontFamily =

    "Arial, sans-serif";

locationText.style.fontSize =

    "13px";

locationText.style.lineHeight =

    "1.6";

locationText.style.textShadow =

    "0 2px 5px black";

hud.appendChild(

    locationText

);

/* =========================================================

   СОСТОЯНИЕ

========================================================= */

const status =

    document.createElement("div");

status.style.position =

    "absolute";

status.style.left =

    "20px";

status.style.bottom =

    "25px";

status.style.color =

    "#c5cbbb";

status.style.fontFamily =

    "Arial, sans-serif";

status.style.fontSize =

    "12px";

status.style.textShadow =

    "0 2px 5px black";

status.innerHTML =

    "ЗДОРОВЬЕ  ██████████  100%";

hud.appendChild(

    status

);

/* =========================================================

   МИНИ-КАРТА

========================================================= */

const map =

    document.createElement("div");

map.style.position =

    "absolute";

map.style.top =

    "18px";

map.style.right =

    "18px";

map.style.width =

    "125px";

map.style.height =

    "125px";

map.style.border =

    "1px solid rgba(200,210,190,.4)";

map.style.background =

    "rgba(15,20,17,.72)";

map.style.boxShadow =

    "0 0 15px rgba(0,0,0,.5)";

hud.appendChild(

    map

);

/* =========================================================

   КАРТА — ДОРОГА

========================================================= */

const mapRoad =

    document.createElement("div");

mapRoad.style.position =

    "absolute";

mapRoad.style.left =

    "55px";

mapRoad.style.top =

    "0";

mapRoad.style.width =

    "15px";

mapRoad.style.height =

    "100%";

mapRoad.style.background =

    "rgba(105,100,83,.4)";

map.appendChild(

    mapRoad

);

/* =========================================================

   КАРТА — ЛАГЕРЬ

========================================================= */

const mapCamp =

    document.createElement("div");

mapCamp.style.position =

    "absolute";

mapCamp.style.left =

    "49px";

mapCamp.style.top =

    "50px";

mapCamp.style.width =

    "28px";

mapCamp.style.height =

    "28px";

mapCamp.style.borderRadius =

    "50%";

mapCamp.style.background =

    "rgba(214,115,46,.8)";

mapCamp.style.boxShadow =

    "0 0 12px rgba(255,130,50,.6)";

map.appendChild(

    mapCamp

);

/* =========================================================

   ТОЧКА ИГРОКА

========================================================= */

const playerDot =

    document.createElement("div");

playerDot.style.position =

    "absolute";

playerDot.style.width =

    "7px";

playerDot.style.height =

    "7px";

playerDot.style.borderRadius =

    "50%";

playerDot.style.background =

    "#d5d8cb";

playerDot.style.boxShadow =

    "0 0 7px white";

map.appendChild(

    playerDot

);

/* =========================================================

   КОМПАС

========================================================= */

const compass =

    document.createElement("div");

compass.style.position =

    "absolute";

compass.style.top =

    "150px";

compass.style.right =

    "20px";

compass.style.color =

    "#c8cdbf";

compass.style.fontFamily =

    "Arial";

compass.style.fontSize =

    "11px";

compass.textContent =

    "N";

hud.appendChild(

    compass

);

/* =========================================================

   ПОДСКАЗКА

========================================================= */

const interaction =

    document.createElement("div");

interaction.style.position =

    "absolute";

interaction.style.left =

    "50%";

interaction.style.bottom =

    "70px";

interaction.style.transform =

    "translateX(-50%)";

interaction.style.padding =

    "8px 14px";

interaction.style.background =

    "rgba(5,8,6,.75)";

interaction.style.border =

    "1px solid rgba(200,210,190,.2)";

interaction.style.color =

    "#d0d5c8";

interaction.style.fontFamily =

    "Arial";

interaction.style.fontSize =

    "12px";

interaction.style.display =

    "none";

hud.appendChild(

    interaction

);

/* =========================================================

   ПЕРЕКРЕСТИЕ

========================================================= */

const crosshair =

    document.createElement("div");

crosshair.style.position =

    "absolute";

crosshair.style.left =

    "50%";

crosshair.style.top =

    "50%";

crosshair.style.transform =

    "translate(-50%,-50%)";

crosshair.style.color =

    "rgba(220,225,215,.75)";

crosshair.style.fontSize =

    "18px";

crosshair.textContent =

    "+";

hud.appendChild(

    crosshair

);

/* =========================================================

   НОЧНОЙ ФИЛЬТР

========================================================= */

const screen =

    document.createElement("div");

screen.style.position =

    "fixed";

screen.style.inset =

    "0";

screen.style.pointerEvents =

    "none";

screen.style.zIndex =

    "15";

screen.style.background =

    "radial-gradient(circle, transparent 40%, rgba(0,0,0,.35) 100%)";

document.body.appendChild(

    screen

);

/* =========================================================

   ВИНЬЕТКА

========================================================= */

const vignette =

    document.createElement("div");

vignette.style.position =

    "fixed";

vignette.style.inset =

    "0";

vignette.style.pointerEvents =

    "none";

vignette.style.zIndex =

    "16";

vignette.style.boxShadow =

    "inset 0 0 100px rgba(0,0,0,.55)";

document.body.appendChild(

    vignette

);

/* =========================================================

   ПОЛОЖЕНИЕ ИГРОКА НА КАРТЕ

========================================================= */

function updateMap() {

    const scale =

        0.55;

    const mapX =

        62.5 +

        camera.position.x *

        scale;

    const mapY =

        62.5 +

        (camera.position.z + 45) *

        scale;

    playerDot.style.left =

        Math.max(

            3,

            Math.min(

                118,

                mapX

            )

        ) + "px";

    playerDot.style.top =

        Math.max(

            3,

            Math.min(

                118,

                mapY

            )

        ) + "px";

    compass.style.transform =

        `rotate(${

            -cameraYaw * 57.3

        }deg)`;

}

/* =========================================================

   ВЗАИМОДЕЙСТВИЕ

========================================================= */

function checkInteraction() {

    let found =

        false;

    npcs.forEach(

        npc => {

            const distance =

                camera.position.distanceTo(

                    npc.position

                );

            if (

                distance < 3.5

            ) {

                found =

                    true;

                interaction.textContent =

                    "E — поговорить";

                interaction.style.display =

                    "block";

            }

        }

    );

    if (

        !found

    ) {

        interaction.style.display =

            "none";

    }

}

/* =========================================================

   КНОПКА E

========================================================= */

window.addEventListener(

    "keydown",

    event => {

        if (

            event.code !==

            "KeyE"

        )

            return;

        let closest =

            null;

        let distance =

            3.5;

        npcs.forEach(

            npc => {

                const d =

                    camera.position.distanceTo(

                        npc.position

                    );

                if (

                    d < distance

                ) {

                    closest =

                        npc;

                    distance =

                        d;

                }

            }

        );

        if (

            closest

        ) {

            dialogue.style.display =

                "block";

            if (

                closest.userData.type ===

                "guitarist"

            ) {

                dialogue.textContent =

                    "🎸 Гитарист: «Садись. Пока дождь идёт — здесь безопаснее.»";

            }

            else {

                dialogue.textContent =

                    "🧑 Сталкер: «Новичок? Тогда держись рядом с лагерем.»";

            }

        }

    }

);

/* =========================================================

   МОБИЛЬНОЕ ВЗАИМОДЕЙСТВИЕ

========================================================= */

const interactButton =

    document.createElement("button");

interactButton.textContent =

    "E";

interactButton.style.position =

    "fixed";

interactButton.style.right =

    "25px";

interactButton.style.bottom =

    "35px";

interactButton.style.width =

    "55px";

interactButton.style.height =

    "55px";

interactButton.style.borderRadius =

    "50%";

interactButton.style.border =

    "1px solid rgba(210,220,200,.35)";

interactButton.style.background =

    "rgba(15,20,16,.75)";

interactButton.style.color =

    "#d5d9cd";

interactButton.style.fontSize =

    "18px";

interactButton.style.zIndex =

    "40";

interactButton.style.display =

    "none";

document.body.appendChild(

    interactButton

);

interactButton.addEventListener(

    "click",

    () => {

        let closest =

            null;

        let distance =

            3.5;

        npcs.forEach(

            npc => {

                const d =

                    camera.position.distanceTo(

                        npc.position

                    );

                if (

                    d < distance

                ) {

                    closest =

                        npc;

                    distance =

                        d;

                }

            }

        );

        if (

            closest

        ) {

            dialogue.style.display =

                "block";

            dialogue.textContent =

                closest.userData.type ===

                "guitarist"

                    ? "🎸 Гитарист: «Садись к костру. Ночь впереди длинная.»"

                    : "🧑 Сталкер: «Добро пожаловать в Зону.»";

        }

    }

);

/* =========================================================

   ОПРЕДЕЛЕНИЕ МОБИЛЬНОГО УСТРОЙСТВА

========================================================= */

if (

    "ontouchstart" in window

) {

    interactButton.style.display =

        "block";

}

/* =========================================================

   ЛЁГКОЕ ПОКАЧИВАНИЕ КАМЕРЫ

========================================================= */

let walkTime =

    0;

function updateCameraAtmosphere(

    moving,

    delta

) {

    if (

        moving

    ) {

        walkTime +=

            delta * 8;

        camera.position.y =

            1.7 +

            Math.sin(

                walkTime

            ) * 0.025;

    }

    else {

        camera.position.y =

            THREE.MathUtils.lerp(

                camera.position.y,

                1.7,

                0.08

            );

    }

}

/* =========================================================

   ФИНАЛЬНЫЙ UPDATE

========================================================= */

function finalUpdate(

    delta

) {

    const moving =

        keys.forward ||

        keys.backward ||

        keys.left ||

        keys.right ||

        Math.abs(

            joystickX

        ) > 0.1 ||

        Math.abs(

            joystickY

        ) > 0.1;

    updateAtmosphere(

        performance.now() / 1000

    );

    updateMap();

    checkInteraction();

    updateCameraAtmosphere(

        moving,

        delta

    );

}

/* =========================================================

   ФИНАЛЬНЫЙ ЦИКЛ

========================================================= */

function gameLoop() {

    requestAnimationFrame(

        gameLoop

    );

    const delta =

        Math.min(

            clock.getDelta(),

            0.05

        );

    updatePlayer(

        delta

    );

    updateCamera();

    finalUpdate(

        delta

    );

    renderer.render(

        scene,

        camera

    );

}

/* =========================================================

   ЗАПУСК ИГРЫ

========================================================= */

gameLoop();

console.log(

    "☢ STALKER 3D — ЗОНА ГОТОВА"

);
