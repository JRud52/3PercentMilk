/*
    Graphics Assignment 2
    Group Members: Justin, Tyler, Will, Michael, Guy
*/



var camera, scene, renderer, controls;
var mapGeo;
var clock = new THREE.Clock();

var dae;

			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			loader.load( 'textures/monster.dae', function ( collada ) {

				dae = collada.scene;

				dae.traverse( function ( child ) {

					if ( child instanceof THREE.SkinnedMesh ) {

						var animation = new THREE.Animation( child, child.geometry.animation );
						animation.play();

					}

				} );

				dae.scale.x = dae.scale.y = dae.scale.z = 0.5;
                                dae.position.x = 0;
                                dae.position.y = 0;
                                dae.position.z = 0;
				dae.updateMatrix();

			} );




/*
    ONLOAD FUNCTION
*/
function main() {
        init();
        animate();
        update();
}


//initial setup
function init() {

        container = document.getElementById('myCanvas');
        document.body.appendChild(container);

        //webGL renderer size 600x450
        renderer = new THREE.WebGLRenderer({
                antialias: true
        });
        renderer.setPixelRatio(600 / 450);
        renderer.setSize(600, 450);
        container.appendChild(renderer.domElement);


        camera = new THREE.PerspectiveCamera(60, 600 / 450, 0.1, 10000);
        camera.position.z = 2000;
        camera.position.y = 2000;
        camera.lookAt(new THREE.Vector3(500, 0, 500));

        //controls = new THREE.FirstPersonControls( camera );
        //controls.movementSpeed = 1000;
        //controls.lookSpeed = 0.125;
        //controls.lookVertical = true;

        scene = new THREE.Scene();


        mapGeo = new THREE.Geometry();
        var treeGeo = new THREE.BoxGeometry(3, 3, 3);

        //set the pivot point to the bottom of the geometry
        treeGeo.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.5, 0));

        //generate the trees
        //generateTrees(treeGeo, 100, 400, 200, 10, 50);

        var loader = new THREE.TextureLoader();
        var groundTexture = loader.load("textures/grasslight-big.jpg");
        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(25, 25);
        groundTexture.anisotropy = 16;

        var groundMaterial = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0x111111,
                map: groundTexture
        });

        var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000, 20000), groundMaterial);
        mesh.position.y = 0;
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add(mesh);

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.name = 'Spot Light';
        spotLight.position.set(2000, 4000, 2000);
        spotLight.castShadow = true;
        spotLight.shadowCameraNear = 8;
        spotLight.shadowCameraFar = 30;
        spotLight.shadowMapWidth = 1024;
        spotLight.shadowMapHeight = 1024;
        scene.add(spotLight);

        scene.add(dae);


}


var clock = new THREE.Clock();

//updates every frame used for animation and input handling
function update() {

        //controls.update(clock.getDelta());

THREE.AnimationHandler.update( clock.getDelta() );


        //render the scene
        renderer.render(scene, camera);
}

function animate() {

        requestAnimationFrame(animate);
        update();

}



function generateTrees(treeGeo, maxTrees, xBound, zBound, xScaleMax, yScaleMax) {
        var mat = new THREE.MeshPhongMaterial({
                color: 0x00ffff,
                shininess: 150,
                specular: 0x222222,
                shading: THREE.SmoothShading,
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
                tree.position.y = 0;


                scene.add(tree);
        }
}
