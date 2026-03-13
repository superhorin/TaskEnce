import { type SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Calendar1Icon, ClockIcon } from "lucide-react";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface	TaskCalendarProps {
	date:		Date | undefined;
	setDate:	React.Dispatch<SetStateAction<Date | undefined>>;

	currentMonth:		Date;
	setCurrentMonth:	React.Dispatch<SetStateAction<Date>>;
}

export const TaskCalendar = ({ date, setDate, currentMonth, setCurrentMonth }: TaskCalendarProps) => {

	const handlePresetClick = (days: number) => {
		const newDate = addDays(new Date(), days);
		setDate(newDate);
		setCurrentMonth(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
	}

	const handleTimeChange = (type: "hour" | "minute", value: string) => {
		if (!date) return;
		const numValue = parseInt(value, 10);
		const newDate = type === "hour"
			? setHours(date, numValue)
			: setMinutes(date, numValue);
		setDate(newDate);
	}

	return(
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justift-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<Calendar1Icon className="mr-2 h-4 w-4" />
					{date ? (
						<div className="flex items-center gap-2">
							<span>{format(date, "PPP")}</span>
							<span className="test-muted-foreground">{format(date, "HH:mm")}</span>
						</div>
					) : (<span>pick a date</span>)}
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-auto p-0 flex flex-row">
				<div className="flex flex-col">
					<div className="flex flex-wrap gap-2 border-b p-3">
						{[{ label: "Today", value: 0 }, {label: "Tomorrow", value: 1}].map((preset) => (
							<Button 
								key={preset.value}
								type="button"
								variant="outline"
								size="sm"
								onClick={() => handlePresetClick(preset.value)}>
								{preset.label}
							</Button>
						))}
					</div>

					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						month={currentMonth}
						onMonthChange={setCurrentMonth}
						autoFocus
						captionLayout="dropdown"
						startMonth={new Date(2020, 0)}
						endMonth={new Date(2030, 11)}
					/>
				</div>

				<div className="flex flex-col border-l p-2">
					<div className="flex items-center justify-center py-2 text-muted-foreground">
						<ClockIcon className="h-4 w-4" />
					</div>
					<div className="flex h-[300px] gap-1">
						<ScrollArea className="w-16 border-r">
							<div className="flex flex-col p-1">
								{Array.from({ length: 24 }).map((_, i) => (
									<Button
										key={i}
										type="button"
										variant={date?.getHours() === i ? "default" : "ghost"}
										className="h-8 w-full text-xs"
										onClick={() => handleTimeChange("hour", i.toString())}
									>
										{i.toString().padStart(2, "0")}
									</Button>
								))}
							</div>
						</ScrollArea>
						<ScrollArea className="w-16">
							<div className="flex flex-col p-1">
								{[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((min) => (
									<Button
										key={min}
										type="button"
										variant={date?.getMinutes() === min ? "default" : "ghost"}
										className="h-8 w-full text-xs"
										onClick={() => handleTimeChange("minute", min.toString())}
									>
										{min.toString().padStart(2, "0")}
									</Button>
								))}
							</div>
						</ScrollArea>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
