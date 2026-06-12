// ammunition.js
import * as THREE from 'three/webgpu';
import { LaserTrail } from '../_weapons_vxf/trails.js';

/********************
**                 **
** Ammunition Type **
**                 **
********************/
// Laser shape, color, size
const laserGeometry = new THREE.CapsuleGeometry( 0.5, 2, 2, 8 );
const laserMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
// laserGeometry.rotateX(Math.PI / 2); 
export class Laser 
{
    constructor(worldGroup)
    {
        // timing
        this.dt = 0.0;

        // attributes
        this.mesh = new THREE.Mesh(laserGeometry, laserMaterial);
        this.world = worldGroup
        this.myPosition = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.forward = new THREE.Vector3( 0, 0, -1 );
        this.ammunitionSpeed = 800; //800
        this.alive = false;
        this.lifespan = 3.0; // seconds before self-destruct
        this.age = 0;

        // arguments to pass to trail
        this.rotation = new THREE.Quaternion();


    }


    fire(startPos, rotation)
    {
        // initial state when fired
        this.alive = true;
        this.age = 0;

        // initial state position and vector
        this.mesh.position.copy(startPos); // start position in relation to worldSpace/worldGroup
        this.mesh.quaternion.copy(rotation);
        this.rotation.copy(rotation);

        // initial speed
        this.velocity.copy(this.forward).applyQuaternion(rotation).multiplyScalar(this.ammunitionSpeed);

        // make the laser visible
        this.world.add(this.mesh);

    }
    
    /*******************
    **                **
    ** DRAW           **
    **                **
    *******************/
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
        this.myPosition.copy(this.mesh.position);

        // const myTrail = new LaserTrail();
        // myTrail.start(
        //     this.myPosition,
        //     this.rotation,
        //     worldGroup
        // );
        // trails.push(myTrail);

        
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