import React from "react";
import Controls from "../../components/Controls";
import Graph from "../../components/Graph";
export default function HomePage() {
  return (
    <div id="homePage" className="row">
      <header>
        <Controls />
      </header>
      <main>
        <Graph />
      </main>
    </div>
  );
}
