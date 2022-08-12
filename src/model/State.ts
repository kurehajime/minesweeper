export class Cell {
    public Open: boolean
    public Flag: boolean
    public Bomb: boolean
    public Count: number

    public constructor(Open: boolean, Flag: boolean, Bomb: boolean, Count: number) {
        this.Open = Open
        this.Flag = Flag
        this.Bomb = Bomb
        this.Count = Count
    }

    public Copy(): Cell {
        return new Cell(this.Open, this.Flag, this.Bomb, this.Count)
    }
}