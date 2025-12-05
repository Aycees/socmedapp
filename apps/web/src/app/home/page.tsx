import React from "react";

export default function HomePage() {
	return (
		<div className="min-h-screen flex flex-col gap-4 p-4 bg-white">
			<header className="bg-gray-200 p-4 rounded-md">Header</header>

			<div className="flex gap-4 items-start">
				<aside className="w-60 bg-gray-100 p-4 rounded-md hidden sm:block">Left Sidebar</aside>

				<main className="flex-1 bg-gray-200 p-4 rounded-md">
					<div className="h-16 bg-gray-300 rounded-md mb-3">Create Post</div>

					<div className="grid gap-3">
						{Array.from({ length: 6 }).map((_, i) => (
							<article key={i} className="h-32 bg-gray-100 rounded-md p-3">{`Post ${i + 1}`}</article>
						))}
					</div>
				</main>

				<aside className="w-72 bg-gray-100 p-4 rounded-md hidden lg:block">Right Sidebar</aside>
			</div>

			<footer className="bg-gray-200 p-3 rounded-md">Footer</footer>
		</div>
	);
}

