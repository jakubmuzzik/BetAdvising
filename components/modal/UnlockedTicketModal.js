import React, { useState, memo, useRef, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal, Text } from 'react-native'
import { BlurView } from 'expo-blur'
import { MotiView } from 'moti'
import { normalize } from '../../utils'
import { FONTS, FONT_SIZES, COLORS, SPACING } from '../../constants'
import UnlockedTicket from '../tickets/UnlockedTicket'
import { ActivityIndicator } from 'react-native-paper'
import Animated, { FadeInDown, FadeOut, FadeOutDown } from 'react-native-reanimated'

import { supabase } from '../../supabase/config'

const UnlockedTicketModal = ({ 
    visible,
    onCancel, 
    ticketId,
    width=normalize(500),
}) => {
    const [ticket, setTicket] = useState()

    useEffect(() => {
        fetchTicket()
    }, [])

    const fetchTicket = async () => {
        try {
            const { data, error } = await supabase
                .from('tickets')
                .select('*, ticket_entries(*))')
                .eq('id', ticketId)
                .single()

            if (error) throw error

            setTicket(data)
        } catch (error) {
            console.error('Error fetching ticket:', error.message)
        }
    }

    const closeModal = () => {
        onCancel()
    }

    const Content = () => (
        <>
            <View style={{  flex: 1 }}>
                {ticket && <UnlockedTicket ticket={ticket} />}
                {!ticket && <ActivityIndicator color={COLORS.accent} size='small' />}
            </View>
        </>
    )

    return (
        <Modal transparent visible={visible} animationType='none'>
            <BlurView intensity={20} style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', cursor: 'default' }}
                    activeOpacity={1}
                    onPressOut={closeModal}
                >
                    <Animated.View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', width: '100%' }}
                        entering={FadeInDown.duration(200).withInitialValues({ translateY: -100 })}
                        exiting={FadeOutDown.duration(100)}
                    >
                        <TouchableWithoutFeedback>
                            <View style={{
                                borderRadius: 10,
                                width,
                                maxWidth: '90%',
                                maxHeight: '80%'
                            }}>
                                <Content />
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableOpacity>
            </BlurView>
        </Modal>
    )
}

export default UnlockedTicketModal