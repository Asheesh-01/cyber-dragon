import Link from "next/link";

export default function CourseCard({ course }: any) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group"
    >
      <div
        className="
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-xl p-6
          transition-all duration-300 ease-out
          hover:-translate-y-2
          hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]
        "
      >
        <div
          className="
            h-32 bg-gray-800 rounded mb-4
            flex items-center justify-center text-gray-500
            transition-transform duration-300
            group-hover:scale-105
          "
        >
          Course Image
        </div>

        <h2 className="text-xl font-bold">
          {course.title}
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          {course.category}
        </p>

        <p className="text-gray-300 mt-3 text-sm">
          {course.description}
        </p>

        <p className="mt-4 text-blue-400 font-semibold">
          View Course →
        </p>
      </div>
    </Link>
  );
}
