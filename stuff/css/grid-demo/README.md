# CSS Grid Layout

## Conceptos/Terminología

- **Grid container** - elemento html al que se le aplica display: grid. Será el padre de todos los grid items

- **Grid item** - los elementos hijos (directos) del grid container

- **Grid line** - línea verticales y horizontales que marcan las cuadrícula del grid.

- **Grid Track** - es el espacio entre dos grid lines, formarán las columnas y filas de la cuadrícula.

- **Grid Cell** - es la unidad más pequeña de la cuadrícula.

- **Grid Area** - está formada por un número x de celdas en la cuadrícula, delimitada por cuatro grid line's.

---

## Propiedades del padre (Grid Container)

- **display: grid** - define al elemento cómo un contenedor de cuadrícula

- **grid-template-columns** y **grid-template-rows** - definen el tamaño que va ha ocupar cada fila y columna de la cuadrícula.

  - tamaño fijo (px), porcentaje (%), fracción (fr), auto
  - si se repiten valores: repeat(nro repeticiones, tamaño)

- **grid-template-areas** - define una plantilla de cuadrícula haciendo referencia a los nombres que se especifican con la propiedad **grid-area** de cada item.

  - `<grid-area-name>` nombre del grid area
  - . (es para una celda vacia)
  - nome (no se ha definido una grid area)

- **grid-template** - para declarar todo las tres anteriores a la vez.

  ```
  grid-template: <grid-template-areas> <grid-template-rows> / <grid-template-columns>
  ```

- **grid-column, grid-row** - posiciona los elementos de la cuadrícula indicando la posición respecto a las grid-line.

- **grid-column-gap** y **grid-row-gap** - especifican el tamaña de las grid lines.

- **grid-gap** - suma de las dos anteriores.

  ```
  grid-gap: <grid-row-gap> <grid-column-gap>
  ```

- **justify-items** - manera de alinear los elementos a lo largo del eje de las filas. Aplica a todos los elementos dentro del contenedor.

  - start (al inicio)
  - end (al final)
  - center (centrado)
  - stretch (se expande para ocupar todo el espacio)

- **align-items** - manera de alinear los elementos en el eje de las columnas.

  - start (al inicio)
  - end (al final)
  - center (centrado)
  - stretch (se expande para ocupar todo el espacio)

- **justify-content** - manera de alinearse los elementos el eje de las columnas respecto al contedor cuando el contenedor es más grande que el tamaño total de los elementos.

  - start (al inicio)
  - end (al final)
  - center (centrado)
  - stretch (se expande para ocupar todo el espacio)
  - space-around (el mismo espacio entre las columnas pero y la mitad del espacio al inicio y final)
  - space-between (el mismo espacio entre las columnas pero sin espacio al inicio y final)
  - space-evenly (deja el mismo espacio entre las columnas)

- **align-content** - lo mismo que el anterior, pero para el caso del eje de las filas.

---

## Propiedades de los hijos (Grid items)

- **grid-column-start, grid-column-end, grid-row-start y grid-row-end** - determina donde empieza y acaba un elemento del grid.

- **grid-area** - se le asocia un nombre a un elemento del grid, para usarlo en la propiedad grid-template-areas del contenedor.

- **justify-self** - manera de alinear el item dentro de su celda, en el eje de las columnas.

  - start (al inicio)
  - end (al final)
  - center (centrado)
  - stretch (se expande para ocupar todo el espacio)

- **align-self** - manera de alinear el item dentro de su celda, en el eje de las filas.
  - start (al inicio)
  - end (al final)
  - center (centrado)
  - stretch (se expande para ocupar todo el espacio)

---

## Recuros web

A Complete Guide to Grid

https://css-tricks.com/snippets/css/complete-guide-grid/

GRID (resumen de propiedades)

http://grid.malven.co/

CSS Grid cheatsheet

https://devhints.io/css-grid
