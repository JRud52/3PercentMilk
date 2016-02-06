/*
    Graphics Assignment 2
    Group Members: Justin, Tyler, Will, Michael, Guy
*/



var camera, scene, renderer, controls;
var mapGeo;
var clock = new THREE.Clock();


/*
    ONLOAD FUNCTION
*/
function main() {
        init();
        update();
}


//initial setup
function init() {

        container = document.getElementById('myCanvas');
        document.body.appendChild(container);

        //webGL renderer size 600x450
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(600 / 450);
        renderer.setSize(600, 450);
        container.appendChild(renderer.domElement);


        camera = new THREE.PerspectiveCamera(60, 600 / 450, 0.1, 10000);
        camera.position.z = 1000;
        camera.position.y = 2000;
        camera.lookAt(new THREE.Vector3(500,0,500));

        //controls = new THREE.FirstPersonControls( camera );
        //controls.movementSpeed = 1000;
        //controls.lookSpeed = 0.125;
        //controls.lookVertical = true;

        scene = new THREE.Scene();

        mapGeo = new THREE.Geometry();
        var treeGeo = new THREE.BoxGeometry(3, 3, 3);
        generateTrees(treeGeo, 100, 300, 100, 10, 10);
}



//updates every frame used for animation and input handling
function update() {
        requestAnimationFrame(update);

        //controls.update(clock.getDelta());




        //render the scene
        renderer.render(scene, camera);
}


function generateTrees(treeGeo, maxTrees, xBound, zBound, xScaleMax, yScaleMax) {
        var mat = new THREE.MeshBasicMaterial({
                color: 0x00ffff
        });

        for (i = 0; i < maxTrees; i++) {
                tree = new THREE.Mesh(treeGeo, mat);

                //randomly place a tree somewhere in the scene
                tree.position.x = Math.floor(Math.random() * xBound - zBound) * 10;
                tree.position.z = Math.floor(Math.random() * xBound - zBound) * 10;

                //randomize the tree's rotation (0 to 2 Pi)
                tree.rotation.y = Math.floor(Math.random() * (Math.PI * 2));

                //randomize the tree's scale
                //the width and depth of the tree should be the same so it doesnt end up being too thin or stretched
                //minimum scale of 10
                tree.scale.x = Math.floor(Math.random() * xScaleMax + 10);
                tree.scale.z = tree.scale.x;

                tree.scale.y = Math.floor(Math.random() * tree.scale.x * yScaleMax + 10);


                scene.add(tree);
        }
}
