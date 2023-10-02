'use client'
import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {deleteProject, fetchToken} from "@/lib/actions";
import {useRouter} from "next/navigation";

type Props = {
    projectId: string
}

const ProjectActions = ({projectId}: Props) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const handleDeleteProject = async () => {
        setIsDeleting(true);
        const {token} = await fetchToken();
        console.log(token)
        try {
            await deleteProject(projectId, token);
            console.log(projectId, token)
            router.push("/");
        } catch (e) {
            console.log(e);
        } finally {
            setIsDeleting(false)
        }
    }
    return (
        <>
            <Link href={`/edit-project/${projectId}`}
                  className="flexCenter edit-action_btn">
                <Image src="/icons/pencil.svg" width={14} height={14} alt="edit icon"/>
            </Link>
            <button type="button"
                    className={`flexCenter delete-action_btn ${isDeleting ? "bg-gray" : "bg-primary-purple"}`}
                    onClick={handleDeleteProject}>
                <Image src="/icons/trash.svg" width={14} height={14} alt="delete icon"/>
            </button>
        </>
    );
}

export default ProjectActions;
