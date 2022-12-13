(require '[clojure.repl :refer :all])
(require '[clojure.string :as str])

(defn getInput [day testing]
  (->>
   (if (= testing 1) "-test.txt" "-input.txt")
   (str "e0" day)
   (slurp)
   (str/trimr)))

(def input
  (getInput
   2 ; Day
   1 ; Testing
   ))

(def inputLines (str/split-lines input))

(defn getDelta [[x y] dir] 
  (case dir 
    \L [(dec x) y]
    \R [(inc x) y]
    \U [x (dec y)]
    \D [x (inc y)]
    [x y]
    ))

(def buttons [ [1 2 3] 
               [4 5 6] 
               [7 8 8] ])

(defn getNextCoord [pos dir] 
  (let [[x y] pos
        [dx dy] (getDelta pos dir)
        newPos [(+ x dx) (+ y dy)]
        [nx ny] newPos
        nextButton (get (get buttons nx) ny)
        nextPos (if nextButton newPos pos)] 
    nextPos))

(getNextCoord [1 1] \U)

(defn processLine [pos line] 
  (reduce getNextCoord pos line))

(defn e01-1 [lines] 
  (reduce (fn [data line]
              (println "data" data "line" line)
             (let [newPos (processLine (get data :lastPos) line)] 
               {
                :lastPos newPos 
                :numbers (conj (get data :numbers) newPos)
               })
             )
          {:lastPos [1, 1] :numbers []} 
          lines))

(e01-1 inputLines)

; (def lines (str/splitLines input))
