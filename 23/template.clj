(require '[clojure.repl :refer :all])
(require '[clojure.string :as str])

(defn getInput [{day :day testing :testing :or {testing 0}}]
  (->>
   (if (= testing 1) "-test.txt" "-input.txt")
   (str "./e0" day)
   (slurp)
   (str/trimr)))

(def input
  (getInput{ :day 1 :testing 1 }))

; --- Code begins here ---

(defn A [] ())
(defn B [] ())

(println "A:" (A))
(println "B:" (B))
