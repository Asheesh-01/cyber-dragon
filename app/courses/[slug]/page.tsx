import { courses } from "@/data/courses";

export default function CourseDetail({ params }: any) {

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const course = courses.find(c => c.slug === slug);

  if (!course) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Course not found</p>
      </main>
    );
  }


  return (
<main className="min-h-screen bg-black text-white p-10 max-w-5xl mx-auto">

  <div className="grid md:grid-cols-2 gap-10">

    <div>
      <div className="h-64 bg-gray-800 rounded mb-6 flex items-center justify-center">
        Course Image
      </div>

      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-gray-400 mt-2">{course.category}</p>
      <p className="mt-4 text-gray-300">{course.description}</p>
    </div>

    <div className="bg-gray-900 p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Course Modules</h2>

      <ul className="space-y-2">
        {course.modules.map((m: string, i: number) => (
          <li key={i} className="flex justify-between border-b border-gray-800 pb-2">
            <span>{m}</span>
            <span className="text-sm text-gray-500">Locked</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 font-bold text-lg">Price: {course.price}</p>

      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-bold">
        Buy Course
      </button>
    </div>

  </div>

</main>

  );
}
