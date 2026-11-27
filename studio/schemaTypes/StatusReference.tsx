// Editor help only. Keep in step with statusOptions in profile.ts and src/lib/status.ts.
const groups: [string, [when: string, text: string, colour: string][]][] = [
  ["Job hunting", [
    ["Actively looking and can start soon", "Available for work", "Green"],
    ["Open to offers", "Open to new opportunities", "Green"],
    ["Employed but willing to listen", "Open to the right opportunity", "Amber"],
  ]],
  ["Freelance", [
    ["Taking on clients", "Available for freelance", "Green"],
    ["Limited capacity", "Taking on select projects", "Amber"],
    ["Fully booked", "Booked until [month]", "Red"],
  ]],
  ["Busy", [
    ["Happy in your job", "Currently at [company]", "Blue"],
    ["Working on your own thing", "Building [project]", "Blue"],
    ["Studying or upskilling", "Currently learning [topic]", "Blue"],
    ["Open to side work only", "Open to collaborations", "Amber"],
    ["On a break", "Taking a break", "Grey"],
  ]],
];

const cell = { padding: "4px 8px 4px 0", textAlign: "left", verticalAlign: "top" } as const;

export function StatusReference() {
  return (
    <>
      Home page and Links page: the status next to your location.
      <details style={{ marginTop: 8 }}>
        <summary style={{ cursor: "pointer" }}>Which status should I use?</summary>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
          <thead>
            <tr>
              {["Your situation", "Status text", "Dot colour"].map((h) => (
                <th key={h} scope="col" style={cell}>{h}</th>
              ))}
            </tr>
          </thead>
          {groups.map(([group, rows]) => (
            <tbody key={group}>
              <tr>
                <th colSpan={3} scope="colgroup" style={{ ...cell, paddingTop: 12 }}>{group}</th>
              </tr>
              {rows.map(([when, text, colour]) => (
                <tr key={text}>
                  {[when, text, colour].map((v) => (
                    <td key={v} style={cell}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </details>
    </>
  );
}
