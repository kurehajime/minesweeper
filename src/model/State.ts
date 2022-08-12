export class Cell {
    private _Open: boolean
    private _Flag: boolean
    private _Bomb: boolean
    private _Count: number

    get Open() { return this._Open }
    get Flag() { return this._Flag }
    get Bomb() { return this._Bomb }
    get Count() { return this._Count }

    public constructor(Open: boolean, Flag: boolean, Bomb: boolean, Count: number) {
        this._Open = Open
        this._Flag = Flag
        this._Bomb = Bomb
        this._Count = Count
    }

    public OpenedCopy(open: boolean): Cell {
        return new Cell(open, this.Flag, this.Bomb, this.Count)
    }

    public FlagedCopy(flag: boolean): Cell {
        return new Cell(this.Open, flag, this.Bomb, this.Count)
    }

    public Copy(): Cell {
        return new Cell(this.Open, this.Flag, this.Bomb, this.Count)
    }
}