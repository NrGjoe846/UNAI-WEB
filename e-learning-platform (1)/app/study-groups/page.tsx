"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FuturisticCard } from '@/components/ui/FuturisticCard'
import { Progress } from '@/components/ui/progress'
import { FaUsers, FaPlus, FaSearch, FaCode, FaBrain, FaRobot, FaDatabase, FaCloud, FaShieldAlt, FaCalendar, FaComments } from 'react-icons/fa'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const studyGroups = [
  { id: 1, name: "AI Enthusiasts", members: 15, topic: "Artificial Intelligence", icon: FaRobot, progress: 65 },
  { id: 2, name: "Web Dev Wizards", members: 10, topic: "Web Development", icon: FaCode, progress: 80 },
  { id: 3, name: "Data Science Explorers", members: 12, topic: "Data Science", icon: FaDatabase, progress: 45 },
  { id: 4, name: "Cloud Computing Crew", members: 8, topic: "Cloud Computing", icon: FaCloud, progress: 30 },
  { id: 5, name: "Algorithm Adventurers", members: 20, topic: "Algorithms", icon: FaBrain, progress: 70 },
  { id: 6, name: "Cybersecurity Squad", members: 9, topic: "Cybersecurity", icon: FaShieldAlt, progress: 55 },
]

const upcomingEvents = [
  { id: 1, name: "AI Ethics Discussion", date: "2023-07-15", group: "AI Enthusiasts" },
  { id: 2, name: "Web Performance Workshop", date: "2023-07-18", group: "Web Dev Wizards" },
  { id: 3, name: "Data Visualization Seminar", date: "2023-07-20", group: "Data Science Explorers" },
]

export default function StudyGroups() {
  const [joinedGroups, setJoinedGroups] = useState<number[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [newGroupName, setNewGroupName] = useState('')
  const [newGroupTopic, setNewGroupTopic] = useState('')
  const [newGroupDescription, setNewGroupDescription] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  const [showGroupDetails, setShowGroupDetails] = useState(false)

  const handleJoinGroup = (groupId: number) => {
    if (joinedGroups.includes(groupId)) {
      setJoinedGroups(joinedGroups.filter(id => id !== groupId))
    } else {
      setJoinedGroups([...joinedGroups, groupId])
    }
  }

  const handleCreateGroup = () => {
    // Here you would typically make an API call to create the group
    console.log('Creating group:', { name: newGroupName, topic: newGroupTopic, description: newGroupDescription })
    setShowCreateModal(false)
    setNewGroupName('')
    setNewGroupTopic('')
    setNewGroupDescription('')
  }

  const filteredGroups = studyGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.topic.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen p-8 relative">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-background to-background" />
      </div>

      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold gradient-text"
          >
            Study Groups
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
          >
            <FaPlus className="mr-2" /> Create New Group
          </motion.button>
        </div>

        <div className="mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search study groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FuturisticCard className="p-6">
                <div className="flex items-center mb-4">
                  <group.icon className="text-4xl text-purple-500 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold">{group.name}</h3>
                    <p className="text-gray-400">{group.topic}</p>
                  </div>
                </div>
                <p className="mb-4"><FaUsers className="inline-block mr-2" /> {group.members} members</p>
                <Progress value={group.progress} className="mb-4" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{group.progress}% Progress</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleJoinGroup(group.id)}
                    className={`py-2 px-4 rounded-full font-bold ${
                      joinedGroups.includes(group.id)
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                    }`}
                  >
                    {joinedGroups.includes(group.id) ? 'Leave Group' : 'Join Group'}
                  </motion.button>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => {
                    setSelectedGroup(group)
                    setShowGroupDetails(true)
                  }}
                >
                  View Details
                </Button>
              </FuturisticCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-4 gradient-text">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <FuturisticCard key={event.id} className="p-4">
                <h3 className="font-bold mb-2">{event.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{event.group}</p>
                <p className="text-sm flex items-center">
                  <FaCalendar className="mr-2" /> {event.date}
                </p>
              </FuturisticCard>
            ))}
          </div>
        </motion.div>

        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Study Group</DialogTitle>
              <DialogDescription>
                <div className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="groupName" className="block text-sm font-medium mb-1">Group Name</label>
                    <Input
                      id="groupName"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      placeholder="Enter group name"
                    />
                  </div>
                  <div>
                    <label htmlFor="groupTopic" className="block text-sm font-medium mb-1">Topic</label>
                    <Input
                      id="groupTopic"
                      value={newGroupTopic}
                      onChange={(e) => setNewGroupTopic(e.target.value)}
                      placeholder="Enter group topic"
                    />
                  </div>
                  <div>
                    <label htmlFor="groupDescription" className="block text-sm font-medium mb-1">Description</label>
                    <Textarea
                      id="groupDescription"
                      value={newGroupDescription}
                      onChange={(e) => setNewGroupDescription(e.target.value)}
                      placeholder="Describe your study group"
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateGroup}>
                      Create Group
                    </Button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={showGroupDetails} onOpenChange={setShowGroupDetails}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedGroup?.name}</DialogTitle>
              <DialogDescription>
                <p className="mb-2">{selectedGroup?.topic}</p>
                <p className="mb-4"><FaUsers className="inline-block mr-2" /> {selectedGroup?.members} members</p>
                <Progress value={selectedGroup?.progress} className="mb-2" />
                <p className="text-sm text-gray-400 mb-4">{selectedGroup?.progress}% Progress</p>
                <h3 className="font-bold mb-2">Recent Discussions</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <FaComments className="mr-2" /> Latest advancements in {selectedGroup?.topic}
                  </li>
                  <li className="flex items-center">
                    <FaComments className="mr-2" /> Study resources for beginners
                  </li>
                  <li className="flex items-center">
                    <FaComments className="mr-2" /> Upcoming webinar announcements
                  </li>
                </ul>
                <div className="mt-4">
                  <Button className="w-full" onClick={() => setShowGroupDetails(false)}>
                    Close
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

