(require '[clojure.repl :refer :all])
(require '[clojure.string :as str])

(defn getInput [{day :day testing :testing :or {testing 0}}]
  (->>
   (if (= testing 1) "-test.txt" "-input.txt")
   (str "./e0" day)
   (slurp)
   (str/trimr)))

(def input
  (getInput{ :day 2 :testing 0 }))

; --- Start code here ---

(def shapeVal {"A" 1 "B" 2 "C" 3 "X" 1 "Y" 2 "Z" 3})
(def losesTo {1 2 2 3 3 1})
(def wins {1 3 2 1 3 2})

(def lines (map 
             (fn [line] (map #(shapeVal %) (str/split line #" "))) 
             (str/split-lines input)))

(defn A []
  (apply + (map 
             (fn [[a b]] 
                (cond
                  (= a b) (+ b 3)
                  (= (wins b) a) (+ b 6)
                  (= (losesTo b) a) (+ b 0)))
             lines)))

(defn B []
  (apply + (map 
             (fn [[a b]] 
                (cond
                  (= b 2) (+ a 3)
                  (= b 1) (+ (wins a))
                  (= b 3) (+ (losesTo a) 6)))
             lines)))

(println "A:" (A))
(println "B:" (B))
