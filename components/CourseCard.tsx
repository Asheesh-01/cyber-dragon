import Link from "next/link";

export default function CourseCard({ course }: any) {
  return (
    <Link href={`/courses/${course.slug}`} className="block">
      <div className="bg-gray-900 rounded-xl p-5 border border-gray-800
        transform transition duration-300 hover:scale-105 hover:shadow-xl
        flex flex-col h-full">

        {/* Image */}
        <div className="h-36 bg-gray-800 rounded mb-4 flex items-center justify-center text-gray-500">
          Course Image
        </div>

        {/* Content */}
        <h2 className="text-lg font-bold">{course.title}</h2>
        <p className="text-sm text-gray-400">{course.category}</p>

        <p className="text-sm mt-2 text-gray-300 line-clamp-3 flex-grow">
          {course.description}
        </p>

        {/* Price */}
        <div className="mt-4 font-semibold text-blue-400">
          {course.price}
        </div>

      </div>
    </Link>
  );
}
