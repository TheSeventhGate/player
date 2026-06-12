// trails.js
import * as THREE from 'three/webgpu';

/***************
**            **
** Trail Type **
**            **
***************/
const laserTrailPlaneGeometry = new THREE.PlaneGeometry(1,1,1,1);
const laserTrailMaterialGeometry = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

export class LaserTrail
{
    constructor(worldGroup)
    {
        // timing
        this.dt = 0.0;

        // attributes
        this.instancedMesh = new THREE.Mesh(laserTrailPlaneGeometry, laserTrailMaterialGeometry);
        this.world = worldGroup;
        this.myPosition = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.forward = new THREE.Vector3( 0, 0, -1 );
        this.floatSpeed = 1;
        this.alive = false;
        this.lifespan = 1.0; // seconds before self-destruct
        this.age = 0;

    }

    start(startPos, rotation)
    {
        // initial state when started
        this.alive = true;
        this.age = 0;

        // initial state position and vector
        this.instancedMesh.position.copy(startPos); // start position in relation to worldSpace/worldGroup
        this.instancedMesh.quaternion.copy(rotation);
 
        // initial speed
        this.velocity.copy(this.forward).applyQuaternion(rotation).multiplyScalar(this.floatSpeed);

        // make the laser visible
        this.world.add(this.instancedMesh);

    }

    update(dt)
    {
        // if dead return
        if(!this.alive) return;

        // timing
        this.dt = dt; 

        // life span
        this.age += dt;
        if (this.age >= this.lifespan)
        {
            this.destroy();
            return;
        }

        // increment my current position in the universe space/worldpace/worldgroup
        this.instancedMesh.position.addScaledVector(this.velocity, this.dt);
    }

    destroy()
    {
        // if dead return
        if(!this.alive) return;
        this.alive = false;

        // remove object from scene
        if (this.instancedMesh.parent)
        {
            this.instancedMesh.parent.remove(this.instancedMesh);
        }
    }

}