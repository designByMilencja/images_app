import {ProjectInterface, UserProfile} from "@/common.types";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";

type Props = {
    user: UserProfile;
}
const ProfilePage = ({user}: Props) => {
    return (
        <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
            <section className="flexBetween max-lg:flex-col gap-10 w-full">
                <div className='flex items-start flex-col w-full'>
                    <Image src={user?.avatarUrl} width={100} height={100} className="rounded-full" alt="user image"/>
                    <p className="text-4xl font-bold mt-10">{user?.name}</p>
                    <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">I’m Frontend Developer
                        👋</p>

                    <div className="flex mt-8 gap-5 w-full flex-wrap">
                        <Button
                            type="button"
                            title="Follow"
                            leftIcon="/icons/bug-outline.svg"
                            bgColor="bg-light-white-400"
                            textColor="text-black-100"
                        />
                        <Link href={`mailto:${user?.email}`}>
                            <Button type="button"
                                    title="Hire Me"
                                    leftIcon="/icons/bug-outline.svg"/>
                        </Link>
                    </div>
                </div>
                {user?.projects?.edges?.length > 0 ? (
                    <Image
                        src={user?.projects?.edges[0]?.node?.image}
                        alt="project image"
                        width={739}
                        height={554}
                        className='rounded-xl object-contain'
                    />
                ) : (
                    <Image
                        src="/profile-post.png"
                        width={739}
                        height={554}
                        alt="project image"
                        className='rounded-xl'
                    />
                )}
            </section>
            <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
                <p className="w-full text-left text-lg font-semibold">Recent Work</p>

                <div className="profile_projects">
                    {user?.projects?.edges?.map(
                        ({node}: { node: ProjectInterface }) => (
                            <ProjectCard
                                key={`${node?.id}`}
                                id={`${node?.id}`}
                                image={`${node?.image}`}
                                title={`${node?.title}`}
                                name={user.name}
                                avatarUrl={user.avatarUrl}
                                userId={user.id}
                            />
                        )
                    )}
                </div>
            </section>
        </section>
    );
}

export default ProfilePage;
