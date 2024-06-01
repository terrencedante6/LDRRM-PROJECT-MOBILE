import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="" alt="Avatar" />
          <AvatarFallback>MM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Martin Madrazo</p>
          <p className="text-sm text-muted-foreground">martinmad6@email.com</p>
        </div>
        <div className="ml-auto font-medium">Active</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="" alt="Avatar" />
          <AvatarFallback>EC</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Elliot Chong</p>
          <p className="text-sm text-muted-foreground">ChongElli@email.com</p>
        </div>
        <div className="ml-auto font-medium">Offline</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="" alt="Avatar" />
          <AvatarFallback>JO</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Junnard ty olbo</p>
          <p className="text-sm text-muted-foreground">
            junardhepe20@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">Offline</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="" alt="Avatar" />
          <AvatarFallback>HM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Hilichurl Musk</p>
          <p className="text-sm text-muted-foreground">
            hilichurler40@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">Offline</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="" alt="Avatar" />
          <AvatarFallback>LD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Lamar Davis</p>
          <p className="text-sm text-muted-foreground">LD202312@email.com</p>
        </div>
        <div className="ml-auto font-medium">Offline</div>
      </div>
    </div>
  );
}
