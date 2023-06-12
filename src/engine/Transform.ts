export class Transform {
    m: Array<number>;

    constructor(m = [1, 0, 0, 1, 0, 0]) {
        this.m = (m && m.slice()) || [1, 0, 0, 1, 0, 0];
    }

    getMatrix(): Array<number> {
        return this.m;
    }

    copyInto(tr: Transform) {
        tr.m[0] = this.m[0];
        tr.m[1] = this.m[1];
        tr.m[2] = this.m[2];
        tr.m[3] = this.m[3];
        tr.m[4] = this.m[4];
        tr.m[5] = this.m[5];
    }

    multiply(tr: Transform): Transform {
        let matrix = tr.getMatrix();

        let m11 = this.m[0] * matrix[0] + this.m[2] * matrix[1];
        let m12 = this.m[1] * matrix[0] + this.m[3] * matrix[1];

        let m21 = this.m[0] * matrix[2] + this.m[2] * matrix[3];
        let m22 = this.m[1] * matrix[2] + this.m[3] * matrix[3];

        let dx = this.m[0] * matrix[4] + this.m[2] * matrix[5] + this.m[4];
        let dy = this.m[1] * matrix[4] + this.m[3] * matrix[5] + this.m[5];

        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        this.m[4] = dx;
        this.m[5] = dy;
        return this;
    }

    translate(x: number, y: number): Transform {
        this.m[4] += this.m[0] * x + this.m[2] * y;
        this.m[5] += this.m[1] * x + this.m[3] * y;

        return this;
    }
}
