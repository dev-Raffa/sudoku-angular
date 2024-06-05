export interface IColumn {
    value?: number,
    color?: string
}

interface IRow {
    columns: IColumn[]
}

export interface IQuadrant {
    rows: IRow[]
} 

export interface IBoard {
    quadrants: IQuadrant[]
}
