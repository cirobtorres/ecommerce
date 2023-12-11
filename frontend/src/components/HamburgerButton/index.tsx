type HamburgerButtonProps = {
  width?: number;
  height?: number;
  onClick: () => void;
}

export default function HamburgerButton({ width = 32, height = 32, onClick }: HamburgerButtonProps) {
	return (
		<label className="swap swap-rotate">{/* btn btn-circle */}
			<input type="checkbox" onClick={onClick} />{/* hidden checkbox */}
      
			<svg
				className="swap-off fill-current"
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				viewBox="0 0 512 512"
			>{/* hamburger icon */}
				<path
					d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"
				/>
			</svg>
      
			<svg
				className="swap-on fill-current"
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				viewBox="0 0 512 512"
			>{/* close icon */}
				<polygon
					points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
				/>
			</svg>
      
		</label>
	);
}