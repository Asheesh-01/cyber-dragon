export default function CourseCard({ course }: any) {
  const getPriceColor = (price: string) => {
    return price === "Free" ? "text-green-400" : "text-blue-400";
  };

  return (
    <div
      className="group cursor-not-allowed"
    >
      <div
        className="
          h-full bg-black/40 backdrop-blur-xl
          border border-white/10
          rounded-2xl p-6
          transition-all duration-300 ease-out
          opacity-60 hover:opacity-80 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-white/20
        "
      >
        {/* Icon and Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl">
            {course.icon}
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full border bg-gray-500/20 text-gray-400 border-gray-500/30">
            Coming Soon
          </span>
        </div>

        {/* Title and Category */}
        <h2 className="text-xl font-bold mb-2 text-gray-400">
          {course.title}
        </h2>

        <p className="text-xs text-gray-400 font-semibold mb-4">
          {course.category}
        </p>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Topics */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 font-semibold mb-2">KEY TOPICS</p>
          <div className="flex flex-wrap gap-1">
            {course.topics.slice(0, 3).map((topic: string, idx: number) => (
              <span
                key={idx}
                className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-gray-300"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between py-4 border-t border-white/10">
          <div className="flex gap-3">
            <div>
              <p className="text-xs text-gray-400">Duration</p>
              <p className="text-sm font-semibold text-gray-200">{course.duration}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Price</p>
              <p className={`text-sm font-bold ${getPriceColor(course.price)}`}>{course.price}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <p className="mt-4 text-gray-400 font-semibold flex items-center gap-2">
          Coming Soon
          <span>🔒</span>
        </p>
      </div>
    </div>
  );
}
