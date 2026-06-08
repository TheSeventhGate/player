// ammunition.js
import * as THREE from 'three/webgpu';

/********************
**                 **
** Ammunition Type **
**                 **
********************/
// Laser shape, color, size
const laserGeometry = new THREE.CapsuleGeometry( 0.05, 2, 2, 8 );
const laserMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
laserGeometry.rotateX(Math.PI / 2); 
export class Laser 
{
    constructor()
    {
        // timing
        this.dt = 0.0;

        // attributes
        this.mesh = new THREE.Mesh(laserGeometry, laserMaterial);
        this.velocity = new THREE.Vector3();
        this.foward = new THREE.Vector3( 0, 0, -1 );
        this.ammunitionSpeed = 800;
        this.alive = false;
        this.lifespan = 3.0; // Seconds before self-destruct
        this.age = 0;
    }

    /*
        * @param {THREE.Vector3}    startPos - The player's current universe position
        * @param {THREE.Quaternion} rotation - The player's current rotation
        * @param {THREE.Group}      worldGroup - The group that contains all world objects
    */
    fired(startPos, rotation, worldGroup)
    {
        // initial state when fired
        this.alive = true;
        this.age = 0;

        // initial state position and vector
        this.mesh.position.copy(startPos); // start position in relation to worldSpace/worldGroup
        this.mesh.quaternion.copy(rotation);

        // initial speed
        this.velocity.copy(this.foward).applyQuaternion(rotation).multiplyScalar(this.ammunitionSpeed);

        // make the laser visible
        worldGroup.add(this.mesh);

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
        this.mesh.position.addScaledVector(this.velocity, this.dt);

        
    }

    destroy()
    {
        // if dead return
        if(!this.alive) return;
        this.alive = false;

        // remove object from scene
        if (this.mesh.parent)
        {
            this.mesh.parent.remove(this.mesh);
        }

        // remove object from GPU memory
        // this.mesh.geometry.dispose();
        // this.mesh.material.dispose();

    }


}

/********************
**                 **
** Ammunition Type **
**                 **
********************/
export class Beam
{

}

/********************
**                 **
** Ammunition Type **
**                 **
********************/
export class Rocket 
{

}

/********************
**                 **
** Ammunition Type **
**                 **
********************/
export class Missile 
{

}

/********************
**                 **
** Ammunition Type **
**                 **
********************/
export class ScatterShot
{

}

/********************
**                 **
** Ammunition Type **
**                 **
********************/
export class MagneticShot
{

}