// ammunition.js
import * as THREE from 'three/webgpu';

/********************
**                 **
** Ammunition Type **
**                 **
********************/
export class Laser 
{
    constructor()
    {
        // shape, color, size
        const geometry = new THREE.CapsuleGeometry( 0.05, 2, 2, 8 );
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

        // attributes
        this.mesh = new THREE.Mesh(geometry, material);
        this.velocity = new THREE.Vector3();
        this.alive = false;
        this.lifespan = 3.0; // Seconds before self-destruct
        this.age = 0;
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