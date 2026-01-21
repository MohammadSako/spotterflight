import React from "react";

function MyCv() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="mt-28 font-sans">
      <iframe className="md:block hidden" src="cv.pdf" width="1000" height="1000"></iframe>
      <iframe className="md:hidden block" src="cv.pdf" width="500" height="800"></iframe>
     </div>
    </main>
  );
}

export default MyCv;
