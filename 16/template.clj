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
