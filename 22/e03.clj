(require '[clojure.repl :refer :all])
(require '[clojure.string :as str])
(require '[clojure.set :as set])

(defn getInput [{day :day testing :testing :or {testing 0}}]
  (->>
   (if (= testing 1) "-test.txt" "-input.txt")
   (str "./e0" day)
   (slurp)
   (str/trimr)))

(def input
  (getInput{ :day 3 :testing 0 }))

; --- Code begins here ---

(def lines (str/split-lines input))

(defn A [] 
  (->>
    (map (fn [line] (partition (/ (count line) 2) line)) lines)
    (map (fn [comps] (map #(set %) comps)))
    (map (fn [[a b]] (first (set/intersection a b))))
    (map int)
    (map #(if (Character/isUpperCase (char %)) 
            (+ (- % (int \A)) 26 1) 
            (- % (dec (int \a)))))
    (apply +)))

(defn B [] 
  (->>
    (partition 3 lines)
    (map (fn [comps] (map #(set %) comps)))
    (map (fn [sets] (first (apply set/intersection sets))))
    (map int)
    (map #(if (Character/isUpperCase (char %)) 
            (+ (- % (int \A)) 26 1) 
            (- % (dec (int \a)))))
    (apply +)))


(println "A:" (A))
(println "B:" (B))
