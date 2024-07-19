import * as Tabs from "@radix-ui/react-tabs";

type TabsProps = {
  tabInfo: TabsInfo[];
};

type TabsInfo = {
  value: string;
  label: string;
  content: React.ReactElement[] | React.ReactElement;
};

const TabsGui = (props: TabsProps) => {
  return (
    <Tabs.Root className="flex flex-col" defaultValue="tab1">
      <Tabs.List className="flex shrink-0 gap-2 border-b border-gunmetal-100">
        {props.tabInfo.map((tab) => (
          <Tabs.Trigger
            className="flex h-12 flex-1 select-none items-center justify-center 
            rounded-t
            border-x
            border-t
            border-gunmetal-100
            px-5 
            font-semibold 
            leading-none
            outline-none
            transition
            duration-500
            hover:bg-darkblue-500/20
            focus-visible:ring-2
            focus-visible:ring-darkblue-500
            data-[state=active]:cursor-default
            data-[state=active]:bg-darkblue-500
            data-[state=active]:bg-gradient-to-r
            data-[state=active]:text-white data-[state=active]:focus:relative
            "
            value={tab.value}
            key={tab.value}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {props.tabInfo.map((tab) => (
        <Tabs.Content
          className="grow rounded-b border-x border-b border-gunmetal-100 p-5 outline-none"
          value={tab.value}
          key={tab.value}
        >
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default TabsGui;
