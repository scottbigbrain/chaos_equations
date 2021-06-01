using CSV
using DataFrames
# include("vector.jl")


dp(p, t) = [ p[1]cos(p[2]) , p[2]cos(p[1]) ]

dots = Vector[]
for x in -100:2:100
	for y in -100:2:100
		# if (x != 0 && y != 0)
			push!(dots, [BigFloat(x),BigFloat(y)])
		# end
	end
end

history = DataFrame(Time = BigFloat[], Dots = Array{Array,1}[])

for t in 0:1:50
	for i in 1:length(dots)
		dots[i] += dp(dots[i],t)
		# if (dp(dots[i],t)[1] == Inf) println(dots[i]) end
	end
	push!(history, [t, dots])
	print("-")
end

CSV.write("data.csv", history)
