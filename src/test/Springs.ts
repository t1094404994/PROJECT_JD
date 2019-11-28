/**
 * 一些弹簧
 */
class Springs{
    private world:p2.World;
    constructor(){
        let solver=new p2.GSSolver();
        solver.tolerance=0.001;
        this.world.solver=solver;
    }
}