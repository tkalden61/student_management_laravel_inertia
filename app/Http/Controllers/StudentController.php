<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\ClassResource;
use App\Http\Resources\StudentResource;
use App\Models\Classes;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $student = Student::search($request)->paginate(10);

        return Inertia::render('Student/Index', [
            'students' => StudentResource::collection($student)
        ]);
    }

    public function create()
    {
        $classes = ClassResource::collection(Classes::all());
        return Inertia::render('Student/Create',[
            'classes' => $classes
        ]);
    }

    public function store(StoreStudentRequest $request)
    {
        Student::create($request->validated());

        return redirect()->route('students.index')->with('message', 'Student created Successfully');
    }

    public function edit(Student $student)
    {
        $classes = ClassResource::collection(classes::all());
        return Inertia::render('Student/Edit',[
            'classes' => $classes,
            'student' => StudentResource::make($student),
        ]);
    }

    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());
        return redirect()->route('students.index');
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->route('students.index');
    }
}
