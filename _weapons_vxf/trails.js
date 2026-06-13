// trails.js
import * as THREE from 'three/webgpu';

/***************
**            **
** Trail Type **
**            **
***************/
const laserTrailPlaneGeometry = new THREE.PlaneGeometry(0.2,0.2,1,1);
const laserTrailMaterialGeometry = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 1.0
});

export class LaserTrail
{
    constructor(worldGroup)
    {
        // timing
        this.dt = 0.0;

        // attributes
        this.instancedMesh = new THREE.Mesh(
            laserTrailPlaneGeometry,
            laserTrailMaterialGeometry.clone()
        );
        this.world = worldGroup;
        this.myPosition = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.randomDirection = new THREE.Vector3();
        this.forward = new THREE.Vector3( 0, 0, -1 );
        this.floatSpeed = 1;
        this.spreadSpeed = 0.85;
        this.alive = false;
        this.lifespan = 1.0; // seconds before self-destruct
        this.lifePercent = 0;
        this.age = 0;

    }

    start(startPos, rotation)
    {
        // initial state when started
        this.alive = true;
        this.age = 0;

        this.instancedMesh.material.opacity = 1.0;

        // initial state position and vector
        this.instancedMesh.position.copy(startPos); // start position in relation to worldSpace/worldGroup
        this.instancedMesh.quaternion.copy(rotation);
 
        // initial speed
        this.velocity.copy(this.forward).applyQuaternion(rotation).multiplyScalar(this.floatSpeed);

        // make the laser visible
        this.world.add(this.instancedMesh);

        // random x =
        const randX = THREE.MathUtils.randFloatSpread(1.0);

        // random y = 
        const randY = THREE.MathUtils.randFloatSpread(1.0);

        // apply to my direction:
        this.randomDirection.set(randX, randY, 0);
        this.randomDirection.applyQuaternion(rotation);

        this.velocity
            .copy(this.forward)
            .applyQuaternion(rotation)
            .multiplyScalar(this.floatSpeed);

        this.lifePercent = this.lifespan;

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

        // add sideways drift
        this.velocity.add(
            this.randomDirection.multiplyScalar(this.spreadSpeed)
        );

        // increment my current position in the universe space/worldpace/worldgroup
        this.instancedMesh.position.addScaledVector(this.velocity, this.dt);

        // remainning life visuall
        this.lifePercent = this.age / 0.60
        this.instancedMesh.material.opacity = 1.0 - this.lifePercent;

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