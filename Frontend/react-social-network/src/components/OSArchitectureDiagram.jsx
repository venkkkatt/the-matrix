import React, { useRef } from "react";

export default function ShellASTDiagram() {
  const svgRef = useRef(null);

  const downloadPNG = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const img = new Image();
    img.src =
      "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(source)));

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = svg.width.baseVal.value;
      canvas.height = svg.height.baseVal.value;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const link = document.createElement("a");
      link.download = "shell-ast-diagram.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  const Node = ({ x, y, w, h, title, subtitle }) => (
    <g>
      <rect
        x={x}
        y={y}
        rx="16"
        ry="16"
        width={w}
        height={h}
        fill="#111827"
        stroke="#9ee8ff"
        strokeWidth="2.5"
      />
      <text
        x={x + w / 2}
        y={y + 28}
        textAnchor="middle"
        style={{
          fontFamily: '"OCR A Std","OCR A","OCR-A","OCRA",monospace',
          fontSize: 20,
          fill: "#e5f7ff",
          letterSpacing: 1,
        }}>
        {title}
      </text>
      {subtitle && (
        <text
          x={x + w / 2}
          y={y + 52}
          textAnchor="middle"
          style={{
            fontFamily: '"OCR A Std","OCR A","OCR-A","OCRA",monospace',
            fontSize: 12,
            fill: "#9ee8ff",
          }}>
          {subtitle}
        </text>
      )}
    </g>
  );

  const Arrow = ({ x1, y1, x2, y2 }) => {
    const midY = (y1 + y2) / 2;
    return (
      <path
        d={`M ${x1} ${y1} V ${midY} H ${x2} V ${y2}`}
        stroke="#9ee8ff"
        strokeWidth="2.5"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
    );
  };

  return (
    <div
      className="min-h-screen w-full bg-[#0b1020] text-white p-6"
      style={{ fontFamily: '"OCR A Std","OCR A","OCR-A","OCRA",monospace' }}>
      <button
        onClick={downloadPNG}
        className="mb-4 px-4 py-2 bg-[#19324c] text-[#9ee8ff] border border-[#9ee8ff] rounded">
        ⬇ Download PNG
      </button>

      <svg
        ref={svgRef}
        width="1400"
        height="980"
        viewBox="0 0 1400 980"
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#9ee8ff" />
          </marker>
        </defs>

        <rect
          x="10"
          y="10"
          width="1380"
          height="960"
          fill="#0e1628"
          stroke="#19324c"
          strokeWidth="2"
          rx="24"
        />

        {/* Root */}
        <Node
          x={560}
          y={60}
          w={280}
          h={80}
          title="AST ROOT"
          subtitle="entry point"
        />

        {/* Level 1 */}
        <Node
          x={200}
          y={200}
          w={280}
          h={80}
          title="COMMAND NODE"
          subtitle="argv, env, redirs"
        />
        <Node
          x={560}
          y={200}
          w={280}
          h={80}
          title="PIPELINE NODE"
          subtitle="cmd1 | cmd2 | ..."
        />
        <Node
          x={920}
          y={200}
          w={280}
          h={80}
          title="SEQUENCE NODE"
          subtitle="cmd1 ; cmd2"
        />

        {/* Level 2 */}
        <Node
          x={100}
          y={360}
          w={240}
          h={80}
          title="ASSIGNMENT NODE"
          subtitle="VAR=val"
        />
        <Node
          x={380}
          y={360}
          w={240}
          h={80}
          title="REDIRECTION NODE"
          subtitle=">, <, 2>, >>"
        />
        <Node
          x={660}
          y={360}
          w={240}
          h={80}
          title="CONDITIONAL NODE"
          subtitle="&&, ||"
        />
        <Node
          x={940}
          y={360}
          w={240}
          h={80}
          title="SUBSHELL NODE"
          subtitle="( ... )"
        />

        {/* Leaves */}
        <Node
          x={300}
          y={520}
          w={240}
          h={70}
          title="TOKEN"
          subtitle="literal, identifier"
        />
        <Node
          x={700}
          y={520}
          w={240}
          h={70}
          title="OPERATOR"
          subtitle="symbols like |, &&, ;"
        />

        {/* Arrows */}
        <Arrow x1={700} y1={140} x2={340} y2={200} />
        <Arrow x1={700} y1={140} x2={700} y2={200} />
        <Arrow x1={700} y1={140} x2={1060} y2={200} />

        <Arrow x1={340} y1={280} x2={220} y2={360} />
        <Arrow x1={340} y1={280} x2={500} y2={360} />

        <Arrow x1={700} y1={280} x2={780} y2={360} />
        <Arrow x1={1060} y1={280} x2={1060} y2={360} />

        <Arrow x1={220} y1={440} x2={420} y2={520} />
        <Arrow x1={780} y1={440} x2={820} y2={520} />

        {/* Caption */}
        <text
          x="700"
          y="940"
          textAnchor="middle"
          style={{
            fontFamily: '"OCR A Std","OCR A","OCR-A","OCRA",monospace',
            fontSize: 12,
            fill: "#9ee8ff",
            letterSpacing: 2,
          }}>
          AST schematic for custom shell: commands, pipelines, sequences,
          conditionals, subshells.
        </text>
      </svg>
    </div>
  );
}
