(require '[clojure.repl :refer :all])
(require '[clojure.string :as str])

(defn getInput [day testing]
  (->>
   (if (= testing 1) "-testing.txt" "-input.txt")
   (str "e0" day)
   (slurp)
   (str/trimr)))

(doc loop)

(def input
  (getInput
   1 ; Day
   0 ; Testing
   ))

; (def lines (str/splitLines input))
(defn getCmds [s] (str/split s #", "))
(def cmds (getCmds input))

(def dirs ["N", "E", "S", "W"])

(def startDir "N")

(defn turn [oldDir turnDir]
  (as->
   (+ (.indexOf dirs oldDir) (case turnDir \R 1 -1)) idx
    (mod idx (count dirs))
    (get dirs idx)))

(defn moveDir [[dir, x, y, visited hq]]
  (let [[newX, newY] (case dir
                       "N" [x, (+ y 1)]
                       "E" [(+ x 1), y]
                       "S" [x, (- y 1)]
                       "W" [(- x 1), y])
        isHq (and (= hq nil) (contains? visited (str newX "," newY)))
        newVisited (conj visited (str newX "," newY))
        newHq (if isHq [newX, newY] hq)]

    [dir newX newY newVisited newHq]))

(defn n-times [f n initialValue] (nth (iterate f initialValue) n))

(defn e01 [commands]
  (reduce
   #(let [[curDir x y visited hq] %1 ; prev
          turnDir (get %2 0)
          dist (Integer/parseInt (subs %2 1))
          newDir (turn curDir turnDir)
          [_ newX newY newVisited newHq] (n-times moveDir dist [newDir x y visited hq])] 
      [newDir newX newY newVisited newHq])
    ; fn
   [startDir 0 0 #{"0,0"} nil] ; initialValue
   commands)) ; list

(def result (e01 cmds))
(e01 (getCmds "R8, R4, R4, R8"))

(let [
      [_ x y _ [x1 y2]] result
      r1 (+ (abs x) (abs y))
      r2 (+ (abs x1) (abs y2))
      ] 
  (println (str "1: " r1 "\n2: " r2)))
