(require '[clojure.repl :refer :all])
(require '[clojure.string :as str])

(defn getInput [day testing]
  (->>
   (if (= testing 1) "-testing.txt" "-input.txt")
   (str "e0" day)
   (slurp)
   (str/trimr)))

(def input
  (getInput
   1 ; Day
   1 ; Testing
   ))

(doc doseq)

(def groups (str/split input #"\n\n"))

