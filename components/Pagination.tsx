'use client'
import {useRouter} from "next/navigation";
import Button from "@/components/Button";

type Props = {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string;
    endCursor: string;
}
const Pagination = ({startCursor, endCursor, hasNextPage, hasPreviousPage}: Props) => {
    const router = useRouter();

    function handleNavigation(direction: string) {
        const currentParams = new URLSearchParams(window.location.search);
        if (direction === 'next' && hasNextPage) {
            currentParams.delete("startcursor")
            currentParams.set("endcursor", endCursor)
        } else if (direction === 'first' && hasPreviousPage) {
            currentParams.delete("endcursor")
            currentParams.set("startcursor", startCursor)
        }
        const newSearchParams = currentParams.toString();
        const newPathname = `${window.location.pathname}?${newSearchParams}`;
        router.push(newPathname);
    }

    return (
        <div className="full flexCenter gap-5 mt-10">
            {hasPreviousPage && (
                <Button title="First page" type="button" handleClick={() => handleNavigation('first')}/>
            )}
            {hasNextPage && (
                <Button title="Next page" type="button" handleClick={() => handleNavigation('next')}/>
            )}
        </div>
    );
}

export default Pagination;
