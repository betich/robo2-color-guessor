interface InfinityFuzzProps {
  drink: boolean;
  ice: boolean;
  topping: boolean;
}

export default function InfinityFuzz({
  drink,
  ice,
  topping,
}: InfinityFuzzProps) {
  return (
    <svg
      width="266"
      height="332"
      viewBox="0 0 266 332"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="problem">
        <g id="frame">
          <path
            id="Vector 2435"
            d="M263.5 86L230 314C199.167 327 115.7 345.2 28.5 314L2 86"
            stroke="#0E294B"
          />
          <path
            id="Vector 2441"
            d="M162.5 52.5C71.6996 46.9 20.1667 67.1667 5.5 78.5C-8.9 86.3206 18.6663 97.7585 34.4996 102C88.4996 115 205.5 108.5 232.5 102C254.1 96.8 263.333 88.8333 264.5 83.5C258.9 60.3 193.666 51.8333 162.5 52.5Z"
            stroke="#0E294B"
          />
        </g>
        <g id="body">
          <g id="drink">
            <mask
              id="mask0_177_371"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="31"
              y="109"
              width="217"
              height="216"
            >
              <path
                id="mask shape"
                d="M219 304C226 230 228.334 164.833 247 110L32 131C41.2 171 42.1667 263 41.5 304C110.7 340.8 188.667 319.333 219 304Z"
                fill="#E84556"
                stroke="#0E294B"
              />
            </mask>
            <g mask="url(#mask0_177_371)">
              <rect
                id="bottom"
                x="3.5"
                y="192"
                width="267"
                height="153"
                fill={drink ? "#9BD2CC" : "white"}
              />
              <rect
                id="top"
                x="20.0781"
                y="41.7197"
                width="283"
                height="151"
                transform="rotate(15.1127 20.0781 41.7197)"
                fill={drink ? "#E84556" : "white"}
              />
            </g>
          </g>
          <g id="ice">
            <path
              id="cube2"
              d="M52.4997 292.5C44.8997 286.9 55.6664 261.833 61.9997 250C78.9994 250 105.5 267.5 106.5 273.5C107.3 278.3 97.8333 295.167 93 303C80 309.5 61.9997 299.5 52.4997 292.5Z"
              fill={ice ? "#EEE278" : "white"}
              stroke="#0E294B"
            />
            <path
              id="cube1"
              d="M117 308.529C112.2 303.329 111 280.363 111 269.529C112.6 266.329 142.333 265.863 157 266.029C163.8 278.829 161.167 296.696 159 304.029C153.4 308.829 128.667 309.029 117 308.529Z"
              fill={ice ? "#EF7044" : "white"}
              stroke="#0E294B"
            />
          </g>
          <g id="topping">
            <g id="straw">
              <path
                id="straw_2"
                d="M225 1H211L170 297.5H175L225 1Z"
                fill={topping ? "#EEE278" : "white"}
                stroke="#0E294B"
              />
            </g>
            <path
              id="crescent"
              d="M207.99 219.808C211.99 163.808 161.99 160.475 136.49 165.808C130.323 168.475 124.19 175.608 148.99 182.808C173.79 190.008 189.323 210.475 193.99 219.808C196.99 243.142 203.99 275.808 207.99 219.808Z"
              fill={topping ? "#EF7044" : "white"}
              stroke="#0E294B"
            />
            <path
              id="star"
              d="M203.417 132.857C210.928 126.852 207.211 150.612 204.413 163.242C227.953 167.811 228.243 174.757 225.446 177.659L203.296 174.6C205.223 197.259 200.669 199.068 198.151 197.14L183.986 177.125C177.258 178.98 161.547 181.385 152.516 176.165C143.485 170.945 167.988 166.564 181.368 165.026C170.621 155.235 169.708 144.304 170.594 140.062L189.566 153.066C191.053 148.832 195.906 138.863 203.417 132.857Z"
              fill={topping ? "#E1A0CF" : "white"}
              stroke="#0E294B"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
