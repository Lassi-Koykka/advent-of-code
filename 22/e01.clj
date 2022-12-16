(require '[clojure.repl :refer :all])
(require '[clojure.string :as str])

(defn getInput [{day :day testing :testing :or {testing 0}}]
  (->>
   (if (= testing 1) "-test.txt" "-input.txt")
   (str "./e0" day)
   (slurp)
   (str/trimr)))

(def input
  (getInput{:day 1 :testing 0}))

; --- Start code here ---

(def groups 
  (map 
    (fn [g] 
      (map #(Integer/parseInt %) (str/split-lines g))) 
    (str/split input #"\n\n")))

(def totals 
   (sort > (map #(apply + %) groups)))


(println "A:" (nth totals 0))
(println "B:" (apply + (take 3 totals)))
