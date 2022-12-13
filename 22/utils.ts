import {readFileSync} from "fs";


export const getContent = (filename: string, createFile: boolean = false) => readFileSync(filename, {flag: createFile ? "as+" : undefined}).toString().trimEnd()
export const copy = (val: any) => JSON.parse(JSON.stringify(val))
export const transpose = (arr: any[][]) => arr[0].map((_, col) => arr.map(row => row[col]))
export const matchAll = (s:string, regex: RegExp) => [...s.matchAll(regex)].map(r => r[1])
export const array = (l: number, initialVal: any) => new Array(l).fill(null).map(() => initialVal)
export const array2D = (w: number, h: number, initialVal: any) => array(h, array(w, initialVal))
export const mod = ( a :number, b: number) => ((a%b)+b)%b

export class Graph<T> {
  private _adjList: Map<T, Set<T>>;

  constructor() {
    this._adjList = new Map<T, Set<T>>();
  }

  /**
   * Add a Vert to the Graph
   * @param v Vert to add
   */
  addVert(v: T) {
    this._adjList.set(v, new Set());
    return this;
  }

  /**
   * Add a new two-way edge between two verts.
   * @param v Src Vert
   * @param w Dest Vert
   */
  addEdge(v: T, w: T) {
    this._adjList?.get(v)?.add(w);
    return this;
  }
  /**
   * Clear the _adjList.
   */
  clear() {
    this._adjList = new Map<T, Set<T>>();
  }

  /**
   * Check to see if a vertex exists.
   * @param v The vertex to check for.
   */
  hasVert(v: T) {
    return this._adjList.has(v);
  }

  linked(v: T, w: T) {
    return this._adjList.get(v)?.has(w);
  }

  /**
   * Get the size, or number of vertices in the graph.
   */
  get size() {
    return this._adjList.size;
  }

  /**
   *  Conduct a breadth first search between two vertices.
   * @param start The starting vertex.
   * @param end  The ending vertex.
   */
  bfs(start: T, end: T) {
    // Set initial visited set
    const visited = new Set<T>();
    visited.add(start);

    // Start the queue
    const queue = [start];

    // The backwards linking of the verticies
    const predecessor = new Map();

    // Placeholder for the shortest path.
    let path: T[] = [];

    // While the queue isn't empty, recurse through it and
    // and check all children for links from start to end.
    while (queue.length > 0) {
      // Shift the result from the front of the queue.
      let vert = queue.shift();

      // Get all of the verticies linked to this one.
      const links = this._adjList.get(vert!);
      for (const link of links!) {
        // If we've found the ending vert...
        if (link === end) {
          path.push(link);

          // Walk backwards up the list of verticies until we
          // get to the starting vert and record each step into
          // the path array.
          while (vert !== start) {
            path.push(vert!);
            vert = predecessor.get(vert);
          }

          // Push the current vert onto the path, and reverse it.
          path.push(vert);
          path.reverse();
        }

        // If we haven't been to this vert before, add it to the visited map,
        // push the value onto the queue and update the predecessor.
        if (!visited.has(link)) {
          visited.add(link);
          queue.push(link);
          predecessor.set(link, vert);
        }
      }
    }

    // Return the path.
    return path;
  }

  /**
   * Plot a path between two vertices using depth first search.
   * @param start The start vertex
   * @param end The end vertex
   */
  dfs(start: T, end: T) {
    let path: T[] = [];
    const visited = new Set<T>();
    const stack: T[] = [];
    // Add the first vertex.
    stack.push(start);

    // While there are still values in the stack, work the loop!
    while (stack.length > 0) {
      // Pop first vertex off of the stack
      const vertex = stack.pop();

      // If there's a vertex and it hasn't been visted, add it to the visited list,
      // and work the stack to add any children.
      if (vertex && !visited.has(vertex)) {
        visited.add(vertex);

        // Just a check to either get the adjaceny list for the vertex, or
        // return an empty set in case there aren't any values (won't happen).
        const vertices = this._adjList.get(vertex) || new Set<T>();
        for (let v of vertices) {
          if (v === end) {
            visited.add(v);
            path = Array.from(visited);
          }
          stack.push(v);
        }
      }
    }
    return path;
  }
}
