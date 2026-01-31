export default function CourseCard({ course }: any) {
  const getPriceColor = (price: string) => {
    return price === "Free" ? "text-green-400" : "text-blue-400";
  };

  const levelBadge = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500/20 text-green-300";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-300";
      default:
        return "bg-red-500/20 text-red-300";
    }
  };

  return (
    <div className="group cursor-not-allowed">
      <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ease-out opacity-70 hover:opacity-100 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-blue-500/50">
        {/* Media */}
        <div className="relative h-36 bg-gradient-to-br from-indigo-900/60 via-purple-900/60 to-slate-900/60 flex items-center justify-center">
          <div className="text-2xl text-white/60">▶</div>
          <span className="absolute top-3 left-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-white/10 text-gray-200">
            {course.level}
          </span>
          <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-black/50 text-gray-200">
            {course.price}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${levelBadge(course.level)}`}>
              {course.level}
            </span>
            <span className="text-[10px] text-gray-400">{course.category}</span>
            <span className="ml-auto text-[10px] font-semibold px-2 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300">
              Coming Soon
            </span>
          </div>

          <h2 className="text-base font-semibold mb-2 text-white transition-colors group-hover:text-blue-400">
            {course.title}
          </h2>

          <p className="text-xs text-gray-400 mb-4 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <div className="flex items-center gap-2">
              <span>⏱ {course.duration}</span>
              <span>•</span>
              <span>{course.topics.length} modules</span>
            </div>
            <span className={getPriceColor(course.price)}>{course.price}</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
            <span>👥 1.2k</span>
            <span>⭐ 4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
}
